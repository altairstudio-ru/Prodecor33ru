// Telegram Bot Configuration
// Set these values in your environment variables or replace defaults
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || '';

export interface FormData {
  name: string;
  phone: string;
  projectType?: string;
  source?: string;
}

const PROJECT_TYPE_LABELS: Record<string, string> = {
  design: 'Дизайн',
  renovation: 'Ремонт',
  full: 'Под ключ',
  supervision: 'Надзор',
};

export async function sendToTelegram(data: FormData): Promise<{ success: boolean; message: string }> {
  // Fallback: if no bot token configured, log to console (for development)
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('[Telegram] Bot token or chat ID not configured. Message not sent.');
    console.log('[Telegram] Would send:', data);
    // Return success so the UI doesn't break during development
    return { success: true, message: 'Демо-режим: данные выведены в консоль' };
  }

  const projectTypeLabel = data.projectType
    ? PROJECT_TYPE_LABELS[data.projectType] || data.projectType
    : 'Не указан';

  const message = `
<b>Новая заявка с проДЕКОР</b>

<b>Имя:</b> ${data.name || 'Не указано'}
<b>Телефон:</b> ${data.phone}
<b>Тип проекта:</b> ${projectTypeLabel}
${data.source ? `<b>Источник:</b> ${data.source}` : ''}

<i>Дата: ${new Date().toLocaleString('ru-RU')}</i>
  `.trim();

  try {
    // Use Vercel API route to avoid CORS issues
    const response = await fetch('/api/telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name.trim(),
        phone: data.phone,
        projectType: data.projectType,
        source: data.source,
      }),
    });

    const result = await response.json();

    if (result.success) {
      return { success: true, message: result.message };
    } else {
      console.error('[Telegram] API error:', result);
      return { success: false, message: result.message || 'Ошибка отправки. Попробуйте позже.' };
    }
  } catch (error) {
    console.error('[Telegram] Network error:', error);
    return { success: false, message: 'Ошибка сети. Проверьте подключение.' };
  }
}
