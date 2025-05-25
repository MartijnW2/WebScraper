import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import * as XLSX from 'xlsx';

export function exportUsageXlsxHandler(req: Request, res: Response) {
  const logsFile = path.resolve(__dirname, '../logs/usage.log');

  try {
    if (!fs.existsSync(logsFile)) {
      res.status(404).send('No usage log found');
      return;
    }

    const lines = fs.readFileSync(logsFile, 'utf-8').trim().split('\n');
    const records = lines.map(line => {
      const parsed = JSON.parse(line);
      return {
        timestamp: parsed.timestamp,
        filter: parsed.filter || '',
        sort: parsed.sort || '',
        browser: parsed.browser || ''
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(records);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usage');

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Disposition', 'attachment; filename="usage.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to export usage data');
  }
}
