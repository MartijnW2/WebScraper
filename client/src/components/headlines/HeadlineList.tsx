import React from 'react';
import HeadlineItem from './HeadlineItem';

interface Headline {
  title: string;
  link: string;
  comments: number;
  score: number;
}

interface Props {
  headlines: Headline[];
}

const HeadlineList: React.FC<Props> = ({ headlines }) => {
  return (
    <ul>
      {headlines.map((h, i) => (
        <HeadlineItem key={i} headline={h} />
      ))}
    </ul>
  );
};

export default HeadlineList;
