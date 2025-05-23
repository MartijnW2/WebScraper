import React from 'react';

interface Headline {
  title: string;
  link: string;
  comments: number;
  score: number;
}

interface Props {
  headline: Headline;
}

const HeadlineItem: React.FC<Props> = ({ headline }) => {
  return (
    <li>
      <a href={headline.link} target="_blank" rel="noopener noreferrer">
        {headline.title} — 💬 {headline.comments} | ⭐ {headline.score}
      </a>
    </li>
  );
};

export default HeadlineItem;