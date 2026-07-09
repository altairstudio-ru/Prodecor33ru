import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465');
const SMTP_SECURE = process.env.SMTP_SECURE !== 'false';
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM || 'info@prodecor33.ru';
const SMTP_TO = process.env.SMTP_TO || 'info@prodecor33.ru';

const PROJECT_TYPE_LABELS: Record<string, string> = {
  design: 'Дизайн',
  renovation: 'Ремонт',
  full: 'Под ключ',
  supervision: 'Надзор',
};

function createTransporter() {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP not configured');
  }
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, phone, projectType, source } = req.body as {
    name: string;
    phone: string;
    projectType?: string;
    source?: string;
  };

  if (!name?.trim() || !phone?.trim()) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn('[Email] SMTP not configured');
    return res.status(500).json({ success: false, message: 'Email not configured' });
  }

  const projectTypeLabel = projectType
    ? PROJECT_TYPE_LABELS[projectType] || projectType
    : 'Не указан';

  const subject = `Новая заявка с проДЕКОР — ${source || 'Сайт'}`;
  const text = `
Новая заявка с проДЕКОР

Имя: ${name.trim()}
Телефон: ${phone}
Тип проекта: ${projectTypeLabel}
${source ? `Источник: ${source}` : ''}

Дата: ${new Date().toLocaleString('ru-RU')}
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1F1F1F; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1F1F1F; color: #C6A96B; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #F5F3EF; }
    .field { margin-bottom: 16px; }
    .label { font-weight: 600; color: #333; }
    .value { color: #1F1F1F; }
    .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Новая заявка с проДЕКОР</h1>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Имя:</span>
        <span class="value">${name.trim()}</span>
      </div>
      <div class="field">
        <span class="label">Телефон:</span>
        <span class="value">${phone}</span>
      </div>
      <div class="field">
        <span class="label">Тип проекта:</span>
        <span class="value">${projectTypeLabel}</span>
      </div>
      ${source ? `
      <div class="field">
        <span class="label">Источник:</span>
        <span class="value">${source}</span>
      </div>
      ` : ''}
      <div class="field">
        <span class="label">Дата:</span>
        <span class="value">${new Date().toLocaleString('ru-RU')}</span>
      </div>
    </div>
    <div class="footer">
      proДЕКОР — Дизайн и ремонт под ключ
    </div>
  </div>
</body>
</html>
  `.trim();

  try {
    const transporter = createTransporter();
    
    await transporter.sendMail({
      from: SMTP_FROM,
      to: SMTP_TO,
      subject,
      text,
      html,
    });

    return res.status(200).json({ success: true, message: 'Заявка успешно отправлена на почту!' });
  } catch (error) {
    console.error('[Email] Error:', error);
    return res.status(500).json({ success: false, message: 'Ошибка отправки на почту. Попробуйте позже.' });
  }
}
