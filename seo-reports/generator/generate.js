#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const reportType = process.argv[2] || 'week';
const reportId = process.argv[3] || 'week1';
const mode = process.argv[4] || 'client';

const dataPath = path.resolve(__dirname, '../data', `${reportId}.json`);
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const template = fs.readFileSync(path.resolve(__dirname, 'template.html'), 'utf8');

const statusClass = (s) => {
  switch ((s || '').toLowerCase()) {
    case 'done': case 'готово': return 'done';
    case 'wip': case 'в процессе': return 'wip';
    case 'blocked': case 'блокер': return 'blocked';
    default: return 'todo';
  }
};

const statusLabel = (s) => {
  switch ((s || '').toLowerCase()) {
    case 'done': case 'готово': return 'Готово';
    case 'wip': case 'в процессе': return 'В процессе';
    case 'blocked': case 'блокер': return 'Блокер';
    default: return 'Не начато';
  }
};

const responsibilityLabel = (r) => {
  switch ((r || '').toLowerCase()) {
    case 'executor': return 'Исполнитель';
    case 'customer': return 'Заказчик';
    case 'both': return 'Исполнитель, Заказчик';
    default: return 'Исполнитель';
  }
};

const table = (headers, rows) => {
  const head = headers.map((h) => `<th>${h}</th>`).join('');
  const body = rows
    .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`)
    .join('');
  return `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
};

const tasksSection = (title, tasks, extraHeaders = []) => {
  if (!tasks || tasks.length === 0) return '';
  const headers = ['Задача', 'Статус', ...extraHeaders];
  const rows = tasks.map((t) => [
    mode === 'client' ? (t.clientTask || t.task) : t.task,
    `<span class="status ${statusClass(t.status)}">${statusLabel(t.status)}</span>`,
    ...extraHeaders.map((h) => {
      switch (h) {
        case 'Ответственность': return responsibilityLabel(t.responsibility);
        case 'Срок': return t.due || t.date || '—';
        case 'Результат': return mode === 'client' ? (t.clientResult || t.result || '—') : (t.result || '—');
        case 'Дата': return t.date || t.due || '—';
        default: return '—';
      }
    }),
  ]);
  return `<div class="section"><h2>${title}</h2>${table(headers, rows)}</div>`;
};

const metricsSection = (metrics) => {
  if (!metrics) return '';
  const BAR_EXCLUDE = ['страниц', 'индекс', 'позиции', 'посетител', 'заявок', 'в поиске'];
  const items = Object.entries(metrics)
    .map(([key, val]) => {
      let value = val;
      let bar = '';
      const wantsBar = typeof val === 'number' && val <= 100;
      const noBar = BAR_EXCLUDE.some((w) => key.toLowerCase().includes(w));
      if (wantsBar && !noBar) {
        bar = `<div class="bar"><div style="width:${val}%"></div></div>`;
      }
      return `<div class="metric"><div class="value">${value}</div><div class="label">${key}</div>${bar}</div>`;
    })
    .join('');
  return `<div class="section"><h2>Метрики</h2><div class="metrics">${items}</div></div>`;
};

const listSection = (title, items) => {
  if (!items || items.length === 0) return '';
  const list = items.map((i) => `<li>${i}</li>`).join('');
  return `<div class="section"><h2>${title}</h2><ul>${list}</ul></div>`;
};

const sections = [];
if (mode === 'client') {
  sections.push(
    tasksSection('Выполнено', data.done, ['Результат', 'Ответственность']),
    tasksSection('В процессе', data.inProgress, ['Ответственность']),
    tasksSection('План на следующую неделю', data.nextWeek, ['Ответственность', 'Срок']),
    metricsSection(data.metrics),
  );
} else {
  sections.push(
    tasksSection('Выполнено', data.done, ['Результат', 'Дата']),
    tasksSection('В процессе', data.inProgress, ['Ответственный']),
    tasksSection('План на следующую неделю', data.nextWeek, ['Ответственный', 'Срок']),
    metricsSection(data.metrics),
  );
}

if (data.semantics && data.semantics.length && mode === 'client') {
  const headers = Object.keys(data.semantics[0]).map((k) =>
    k.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase())
  );
  const rows = data.semantics.map((s) => Object.values(s));
  sections.push(`<div class="section"><h2>Семантика</h2>${table(headers, rows)}</div>`);
}

if (data.competitors && data.competitors.length && mode !== 'client') {
  const headers = ['Название', 'URL', 'Сильные стороны', 'Что взять'];
  const rows = data.competitors.map((c) => [
    c.name,
    c.url || '—',
    c.strengths || '—',
    c.action || '—',
  ]);
  sections.push(`<div class="section"><h2>Конкуренты</h2>${table(headers, rows)}</div>`);
}

if (mode !== 'client') {
  sections.push(listSection('Риски', data.risks));
}
sections.push(listSection('Рекомендации', data.recommendations));

const title =
  data.meta?.title ||
  `SEO-отчёт · ${data.meta?.type === 'month' ? 'Месяц' : 'Неделя'} ${data.meta?.week || ''}`;

const html = template
  .replaceAll('{{TITLE}}', title)
  .replaceAll('{{PERIOD}}', data.meta?.period || '')
  .replaceAll('{{BADGE}}', data.meta?.badge || (data.meta?.type === 'month' ? 'Месячный отчёт' : 'Недельный отчёт'))
  .replaceAll('{{SECTIONS}}', sections.join('\n'))
  .replaceAll('{{GENERATED}}', new Date().toLocaleDateString('ru-RU'));

const outDir = path.resolve(__dirname, '../reports', reportType);
fs.mkdirSync(outDir, { recursive: true });
const suffix = mode === 'client' ? '' : '-internal';
const outPath = path.join(outDir, `${reportId}${suffix}.html`);
fs.writeFileSync(outPath, html, 'utf8');

console.log(`✓ Сгенерировано: ${outPath}`);
