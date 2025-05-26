import React from 'react';
import HeadlineItem from './HeadlineItem';
import { Headline } from '../types/Headline';

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
