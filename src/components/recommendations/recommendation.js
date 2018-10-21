import React from 'react';

const Recommendation = ({ data }) => {
  return (
    <div className="recommendation content box">
      <h3>{data.title}</h3>
    </div>
  );
};

export default Recommendation;
