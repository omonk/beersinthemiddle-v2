import React, { useState } from 'react';
import generate from 'shortid';

const PriceRange = ({ range }) => <p>{new Array({ length: range }).map(i => '$')}</p>;

const Recommendation = ({ data, centerMapToRecommendation }) => {
  const [isOpen, toggleOpen] = useState(false);
  const { lat, lng } = data.location;
  const { types, location, priceRange } = data;
  return (
    <div className="recommendation-box">
      <h3 className="title is-5">{data.title}</h3>
      {types && <p>{types.join(', ')}</p>}
      {priceRange && <PriceRange range={priceRange} />}
      <div className={`${isOpen ? '' : 'is-hidden'} recommendation-box__main-content`}>
        {location.address && (
          <address>
            <p key={generate()} style={{ marginBottom: '0px' }}>
              {location.address}
            </p>
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
