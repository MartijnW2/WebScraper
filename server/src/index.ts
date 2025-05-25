import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { scrapeHeadlinesFromURL } from './crawler/Scraper';
import { exportUsageXlsxHandler } from '../logs/export-usage';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/scrape', async (req, res) => {
  try {
    const url = 'https://news.ycombinator.com/';
    const headlines = await scrapeHeadlinesFromURL(url);
    res.json({ headlines });
  } catch (err) {
    res.status(500).json({ error: 'Failed to scrape data' });
  }
});

app.post('/api/usage', (req, res) => {
  const usageData = {
    timestamp: new Date().toISOString(),
    filter: req.body.filter,
    sort: req.body.sort,
    browser: req.body.browser,
  };

  const logPath = path.join(__dirname, '../logs/usage.log');

  fs.mkdirSync(path.dirname(logPath), { recursive: true });

  fs.appendFile(logPath, JSON.stringify(usageData) + '\n', (err) => {
    if (err) {
      console.error('Failed to write usage log:', err);
      return res.status(500).send('Error logging usage');
    }
    res.status(200).send('Usage logged');
  });
});

app.get('/api/export-usage-csv', exportUsageXlsxHandler);

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
