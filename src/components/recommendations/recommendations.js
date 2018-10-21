import React from 'react';
import Recommendation from './recommendation';
const Recommendations = ({ data }) => {
  return data && data.length ? (
    <section className="recommendations">
      {data && data.length && data.map(i => <Recommendation data={i} />)}
    </section>
  ) : null;
};

export default Recommendations;
