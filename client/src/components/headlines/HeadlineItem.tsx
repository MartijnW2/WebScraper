import React from 'react';
import "./HeadlineItem.scss"

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
    <div className='headline__item'>
      <a href={headline.link}>
        {headline.title}
      </a>
      <a className='headline__item-comment'>
      💬 Number of comments: {headline.comments} ⭐Score: {headline.score}
      </a>
    </div>
  );
};

export default HeadlineItem;