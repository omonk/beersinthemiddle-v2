import React from 'react';
import PropTypes from 'prop-types';
const Location = ({ data, handleRemoval }) => (
  <li className="location-list-item">
    <p>{data.address}</p>
    <button
      className="button is-danger is-outlined"
      onClick={() => handleRemoval(data.placeId)}
    >
      <span>Delete</span>
    </button>
  </li>
);

Location.propTypes = {
  data: PropTypes.object.isRequired,
  handleRemoval: PropTypes.func.isRequired,
};

export default Location;
