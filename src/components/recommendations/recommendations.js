import React from 'react';
import Recommendation from './recommendation';

const Recommendations = ({ data, centerMapToRecommendation }) => {
  return data && data.length ? (
    <section className="recommendations">
      {data &&
        data.length &&
        data.map(i => (
          <Recommendation
            key={i.id}
            centerMapToRecommendation={centerMapToRecommendation}
            data={i}
          />
        ))}
    </section>
  ) : null;
};

export default Recommendations;
