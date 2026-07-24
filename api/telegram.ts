import type { VercelRequest, VercelResponse } from '@vercel/node';

const TELEGRAM_BOT_TOKEN = process.env.VITE_TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_IDS = (process.env.VITE_TELEGRAM_CHAT_IDS || process.env.TELEGRAM_CHAT_IDS || process.env.VITE_TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_ID || '')
  .split(',')
  .map(id => id.trim())
  .filter(Boolean);

const PROJECT_TYPE_LABELS: Record<string, string> = {
  design: 'Дизайн',
  renovation: 'Ремонт',
  full: 'Под ключ',
  supervision: 'Надзор',
};

async function sendToChat(botToken: string, chatId: string, message: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );
    const result = await response.json();
    if (result.ok) return { ok: true };
    return { ok: false, error: result.description || 'Unknown error' };
  } catch (error: any) {
    return { ok: false, error: error.message };
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, phone, projectType, source, test_chat_id } = req.body as {
    name: string;
    phone: string;
    projectType?: string;
    source?: string;
    test_chat_id?: string;
  };

  if (!name?.trim() || !phone?.trim()) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  if (!TELEGRAM_BOT_TOKEN) {
    console.warn('[Telegram] Bot token not configured');
    return res.status(500).json({ success: false, message: 'Telegram not configured' });
  }

  const projectTypeLabel = projectType
    ? PROJECT_TYPE_LABELS[projectType] || projectType
    : 'Не указан';

  const message = `
<b>Новая заявка с проДЕКОР</b>

<b>Имя:</b> ${name.trim()}
<b>Телефон:</b> ${phone}
<b>Тип проекта:</b> ${projectTypeLabel}
${source ? `<b>Источник:</b> ${source}` : ''}

<i>Дата: ${new Date().toLocaleString('ru-RU')}</i>
  `.trim();

  const chatIds = test_chat_id ? [test_chat_id] : TELEGRAM_CHAT_IDS;

  if (chatIds.length === 0) {
    console.warn('[Telegram] No chat IDs configured');
    return res.status(500).json({ success: false, message: 'Chat ID not configured' });
  }

  const results = await Promise.all(
    chatIds.map(chatId => sendToChat(TELEGRAM_BOT_TOKEN, chatId, message))
  );

  const successCount = results.filter(r => r.ok).length;

  if (successCount > 0) {
    return res.status(200).json({ success: true, message: 'Заявка успешно отправлена!' });
  }

  console.error('[Telegram] All sends failed:', results);
  return res.status(500).json({ success: false, message: 'Ошибка отправки. Попробуйте позже.' });
}
