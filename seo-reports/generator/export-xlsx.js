#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as XLSX from 'xlsx';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const semanticsPath = path.resolve(__dirname, '../data/semantics.json');
if (!fs.existsSync(semanticsPath)) {
  console.error('✗ Не найден data/semantics.json');
  process.exit(1);
}

const semantics = JSON.parse(fs.readFileSync(semanticsPath, 'utf8'));

const wb = XLSX.utils.book_new();

const sheetNames = {
  commercial: 'Коммерческие',
  geo: 'Гео-запросы',
  lowFrequency: 'НЧ-запросы',
  informational: 'Информационные',
  competitors: 'Конкуренты',
};

for (const [key, sheetName] of Object.entries(sheetNames)) {
  const rows = semantics[key] || [];
  if (rows.length === 0) continue;
  const ws = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
}

const clusters = buildClusters(semantics);
if (clusters.length > 0) {
  const ws = XLSX.utils.json_to_sheet(clusters);
  ws['!cols'] = [{ wch: 28 }, { wch: 14 }, { wch: 12 }, { wch: 12 }, { wch: 60 }];
  XLSX.utils.book_append_sheet(wb, ws, 'Кластеры');
}

function buildClusters(semantics) {
  const byPage = new Map();
  for (const group of [semantics.commercial || [], semantics.geo || [], semantics.lowFrequency || []]) {
    for (const row of group) {
      const page = row['Целевая страница'];
      if (!page) continue;
      if (!byPage.has(page)) byPage.set(page, []);
      byPage.get(page).push(row['Запрос']);
    }
  }
  const rows = [];
  for (const [page, queries] of byPage) {
    const commercial = queries.length;
    rows.push({
      'Кластер': page,
      'Запросов': commercial,
      'Тип': page === '/' ? 'Главная' : page.startsWith('/geo') ? 'Гео' : page.startsWith('/blog') ? 'Информационный' : 'Услуга',
      'Страница': page,
      'Запросы': queries.join(', '),
    });
  }
  rows.sort((a, b) => b['Запросов'] - a['Запросов']);
  return rows;
}

if (wb.SheetNames.length === 0) {
  console.error('✗ В semantics.json нет данных для экспорта');
  process.exit(1);
}

const today = new Date().toLocaleDateString('ru-RU').replace(/\./g, '-');
const outPath = path.resolve(__dirname, `../../seo-semantics-${today}.xlsx`);
XLSX.writeFile(wb, outPath);
console.log(`✓ Экспортировано: ${outPath}`);
console.log(`  Листы: ${wb.SheetNames.join(', ')}`);
