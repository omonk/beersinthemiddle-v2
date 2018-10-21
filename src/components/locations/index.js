import React from 'react';
import PropTypes from 'prop-types';
import Location from './location';

const Locations = ({ locations, handleRemoval }) =>
  locations && locations.length ? (
    <ul className="location-list">
      {locations.map((location, i) => (
        <Location
          key={location.placeId}
          handleRemoval={handleRemoval}
          data={location}
        />
      ))}
    </ul>
  ) : null;

Locations.defaultProps = {
  locations: [],
};

Locations.propTypes = {
  locations: PropTypes.array.isRequired,
  handleRemoval: PropTypes.func.isRequired,
};

export default Locations;
