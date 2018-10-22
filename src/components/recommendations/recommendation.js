import React from 'react';

const Recommendation = ({ data, centerMapToRecommendation }) => {
  const { lat, lng } = data.location;
  return (
    <div className="recommendation content box">
      <h3>{data.title}</h3>
      {data.categories && <p>{data.categories.map(category => category)}</p>}
      {data.location.address && (
        <address>
          {data.location.address.map((line, index, arr) => {
            return (
              <p style={{ marginBottom: '0px' }}>
                {line}
                {index < arr.length - 1 ? ',' : null}
              </p>
            );
          })}
        </address>
      )}
      <button
        className="button is-primary"
        onClick={() => centerMapToRecommendation({ lat, lng })}
      >
        Show on map
      </button>
    </div>
  );
};

export default Recommendation;
