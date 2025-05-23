import express from 'express';
import cors from 'cors';
import { scrapeHeadlinesFromURL } from './crawler/Scraper';

const app = express();
const port = 5000;

app.use(cors());

app.get('/api/scrape', async (req, res) => {
  try {
    const url = 'https://news.ycombinator.com/';
    const headlines = await scrapeHeadlinesFromURL(url);
    res.json({ headlines });
  } catch (err) {
    res.status(500).json({ error: 'Failed to scrape data' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
