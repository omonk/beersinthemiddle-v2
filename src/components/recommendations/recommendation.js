import React, { useState } from 'react';
import generate from 'shortid';

const Recommendation = ({ data, centerMapToRecommendation }) => {
  const [isOpen, toggleOpen] = useState(false);
  const { lat, lng } = data.location;
  return (
    <div className="recommendation-box">
      <h3 className="title is-5">{data.title}</h3>
      {data.categories && <p>{data.categories.join(', ')}</p>}
      <div className={`${isOpen ? '' : 'is-hidden'} recommendation-box__main-content`}>
        {data.location.address && (
          <address>
            {data.location.address.map((line, index, arr) => {
              return (
                <p key={generate()} style={{ marginBottom: '0px' }}>
                  {line}
                  {index < arr.length - 1 ? ',' : null}
                </p>
              );
            })}
          </address>
        )}
      </div>
      <div className="field is-grouped">
        <p className="control">
          <button type="button" className="button is-primary" onClick={() => centerMapToRecommendation({ lat, lng })}>
            Show on map
          </button>
        </p>
        <p className="control">
          <button type="button" className="button is-primary" onClick={() => toggleOpen(!isOpen)}>
            Show details
          </button>
        </p>
      </div>
    </div>
  );
};

export default Recommendation;
