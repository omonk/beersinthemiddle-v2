import React, { Fragment, useState } from 'react';
import generate from 'shortid';

const PriceRange = ({ range, fill = '$' }) => (
  <p>Price range: {range ? new Array(range).fill(fill).join('') : 'n/a'}</p>
);

const Recommendation = ({ data, centerMapToRecommendation }) => {
  const [isOpen, toggleOpen] = useState(false);
  const { lat, lng } = data.location;
  const { types, location, price } = data;

  return (
    <div className="recommendation-box">
      <h3 className="title is-5">{data.title}</h3>
      {types && types.length > 0 && (
        <p>
          Categories:{' '}
          {types.map(({ label, name }) => {
            return (
              <Fragment key={name}>
                <span key={name}>{label}</span>
                {', '}
              </Fragment>
            );
          })}
        </p>
      )}
      <PriceRange range={price.priceRange} />
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
