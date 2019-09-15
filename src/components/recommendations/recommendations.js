import React from 'react';
import Recommendation from './recommendation';
import generate from 'shortid';

const Recommendations = ({ data, centerMapToRecommendation }) => {
  console.log({ r: data });
  return data && data.length ? (
    <section className="recommendations-wrapper">
      {data.map(i => (
        <Recommendation key={generate()} centerMapToRecommendation={centerMapToRecommendation} data={i} />
      ))}
    </section>
  ) : null;
};

export default Recommendations;
