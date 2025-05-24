import axios from 'axios';
import { load } from 'cheerio';

interface Headline {
  title: string;
  link: string;
  comments: string;
  score: string;
}

export const scrapeHeadlinesFromURL = async (url: string): Promise<Headline[]> => {
  const html = await fetchHTML(url);
  const headlines = parseHeadlines(html);
  return headlines;
};

export const fetchHTML = async (url: string): Promise<string> => {
  const response = await axios.get<string>(url);
  return response.data;
};

export const parseHeadlines = (html: string): Headline[] => {
  const $ = load(html);
  const headlines: Headline[] = [];

  const athingRows = $('.athing');

  athingRows.each((index, element) => {
    const row = $(element);
    const anchor = row.find('.titleline a');

    const titleText = anchor.text().trim();
    const linkUrl = anchor.attr('href') || '';

    const subtextRow = row.next();
    const commentLink = subtextRow.find('.subtext a').last();
    const scoreText = subtextRow.find('.score').text().trim();
    const commentText = commentLink.text().trim();

    if (titleText && linkUrl) {
      headlines.push({
        title: titleText,
        link: linkUrl,
        comments: commentText || '0 comments',
        score: scoreText || '0 points',
      });
    }
  });

  return headlines;
};
