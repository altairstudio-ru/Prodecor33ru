export const prerender = false;

const PROJECT_TYPE_LABELS: Record<string, string> = {
  design: 'Дизайн',
  renovation: 'Ремонт',
  full: 'Под ключ',
  supervision: 'Надзор',
};

function env(name: string): string {
  return import.meta.env?.[name] ?? process.env?.[name] ?? '';
}

const TELEGRAM_BOT_TOKEN = env('VITE_TELEGRAM_BOT_TOKEN') || env('TELEGRAM_BOT_TOKEN');
const TELEGRAM_CHAT_IDS = (
  env('VITE_TELEGRAM_CHAT_IDS') || env('TELEGRAM_CHAT_IDS') || env('VITE_TELEGRAM_CHAT_ID') || env('TELEGRAM_CHAT_ID') || ''
)
  .split(',')
  .map((id) => id.trim())
  .filter(Boolean);

const TELEGRAM_ENABLED = env('VITE_TELEGRAM_ENABLED') === 'true' || env('TELEGRAM_ENABLED') === 'true';

const RESEND_API_KEY = env('RESEND_API_KEY');
const EMAIL_FROM = env('EMAIL_FROM') || 'info@prodecor33.ru';
const EMAIL_TO = env('EMAIL_TO') || 'info@prodecor33.ru';
const EMAIL_ENABLED = env('VITE_EMAIL_ENABLED') === 'true' || env('EMAIL_ENABLED') === 'true';

async function sendToTelegramChat(botToken: string, chatId: string, message: string): Promise<boolean> {
  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' }),
    });
    const result = await response.json();
    return Boolean(result?.ok);
  } catch {
    return false;
  }
}

function buildMessage(name: string, phone: string, projectType?: string, source?: string): string {
  const projectTypeLabel = projectType
    ? PROJECT_TYPE_LABELS[projectType] || projectType
    : 'Не указан';

  return `
<b>Новая заявка с проДЕКОР</b>

<b>Имя:</b> ${name}
<b>Телефон:</b> ${phone}
<b>Тип проекта:</b> ${projectTypeLabel}
${source ? `<b>Источник:</b> ${source}` : ''}

<i>Дата: ${new Date().toLocaleString('ru-RU')}</i>
  `.trim();
}

export async function POST({ request }: { request: Request }) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, message: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ success: false, message: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { name, phone, projectType, source, test_chat_id } = body;

  if (!name?.trim() || !phone?.trim()) {
    return new Response(JSON.stringify({ success: false, message: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const message = buildMessage(name.trim(), phone, projectType, source);

  const results: { success: boolean; message: string }[] = [];

  if (TELEGRAM_ENABLED) {
    if (!TELEGRAM_BOT_TOKEN || TELEGRAM_CHAT_IDS.length === 0) {
      results.push({ success: false, message: 'Telegram not configured' });
    } else {
      const chatIds = test_chat_id ? [test_chat_id] : TELEGRAM_CHAT_IDS;
      const sent = await Promise.all(chatIds.map((chatId) => sendToTelegramChat(TELEGRAM_BOT_TOKEN, chatId, message)));
      const ok = sent.some(Boolean);
      results.push({ success: ok, message: ok ? 'Telegram' : 'Telegram send failed' });
    }
  }

  if (EMAIL_ENABLED) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(RESEND_API_KEY);

      const subject = `Новая заявка с проДЕКОР — ${source || 'Сайт'}`;
      const text = buildMessage(name.trim(), phone, projectType, source)
        .replace(/<[^>]+>/g, '')
        .replace(/^/gm, '');

      const { data, error } = await resend.emails.send({
        from: EMAIL_FROM,
        to: [EMAIL_TO],
        subject,
        text,
        html: message.replace(/\n/g, '<br/>'),
      });

      if (error) {
        results.push({ success: false, message: `Email: ${error.message}` });
      } else {
        results.push({ success: true, message: `Email${data?.id ? ' (id: ' + data.id + ')' : ''}` });
      }
    } catch (error) {
      results.push({ success: false, message: `Email error: ${error instanceof Error ? error.message : 'unknown'}` });
    }
  }

  if (!TELEGRAM_ENABLED && !EMAIL_ENABLED) {
    return new Response(
      JSON.stringify({ success: true, message: 'Демо-режим: каналы уведомлений отключены' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const anySuccess = results.some((r) => r.success);
  const messages = results.map((r) => r.message).join('; ');

  return new Response(
    JSON.stringify({
      success: anySuccess,
      message: anySuccess ? 'Заявка успешно отправлена!' : messages,
    }),
    {
      status: anySuccess ? 200 : 500,
      headers: { 'Content-Type': 'application/json' },
    },
  );
}
