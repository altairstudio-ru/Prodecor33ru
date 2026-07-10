// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || '';
const TELEGRAM_TEST_CHAT_ID = import.meta.env.VITE_TELEGRAM_TEST_CHAT_ID || '';

// Channel toggles
const TELEGRAM_ENABLED = import.meta.env.VITE_TELEGRAM_ENABLED === 'true';
const EMAIL_ENABLED = import.meta.env.VITE_EMAIL_ENABLED === 'true';

// Test email override
const EMAIL_TEST_ADDRESS = import.meta.env.VITE_EMAIL_TEST_ADDRESS || '';

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

function getTestChatId(): string | null {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    if (params.get('debug_chat') === '1' || params.get('test_chat') === '1') {
      return TELEGRAM_TEST_CHAT_ID || null;
    }
  }
  return null;
}

function getTestEmail(): string | null {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    if (params.get('test_email') === '1') {
      return EMAIL_TEST_ADDRESS || null;
    }
  }
  return null;
}

export async function sendToTelegram(data: FormData): Promise<{ success: boolean; message: string }> {
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

  const results: { success: boolean; message: string }[] = [];

  // Send to Telegram if enabled
  if (TELEGRAM_ENABLED) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.warn('[Telegram] Bot token or chat ID not configured');
      results.push({ success: false, message: 'Telegram not configured' });
    } else {
      try {
        const testChatId = getTestChatId();
        const body: Record<string, unknown> = {
          name: data.name.trim(),
          phone: data.phone,
          projectType: data.projectType,
          source: data.source,
        };
        if (testChatId) {
          body.test_chat_id = testChatId;
        }

        const response = await fetch('/api/telegram', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        const result = await response.json();
        results.push({ success: result.success, message: result.message });
      } catch (error) {
        console.error('[Telegram] Network error:', error);
        results.push({ success: false, message: 'Telegram network error' });
      }
    }
  }

  // Send to Email if enabled
  if (EMAIL_ENABLED) {
    try {
      const testEmail = getTestEmail();
      const body: Record<string, unknown> = {
        name: data.name.trim(),
        phone: data.phone,
        projectType: data.projectType,
        source: data.source,
      };
      if (testEmail) {
        body.test_email = testEmail;
      }

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      results.push({ success: result.success, message: result.message });
    } catch (error) {
      console.error('[Email] Network error:', error);
      results.push({ success: false, message: 'Email network error' });
    }
  }

  // If neither channel is enabled, use demo mode
  if (!TELEGRAM_ENABLED && !EMAIL_ENABLED) {
    console.warn('[Form] No notification channels enabled. Demo mode.');
    return { success: true, message: 'Демо-режим: каналы уведомлений отключены' };
  }

  // Return combined result
  const anySuccess = results.some(r => r.success);
  const messages = results.map(r => r.message).join('; ');
  
  return { success: anySuccess, message: anySuccess ? 'Заявка успешно отправлена!' : messages };
}
