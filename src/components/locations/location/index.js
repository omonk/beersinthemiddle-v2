import React from 'react';
import PropTypes from 'prop-types';
const Location = ({ data, handleRemoval }) => (
  <li>
    <p>{data.address}</p>
    <button onClick={() => handleRemoval(data.placeId)}>X</button>
  </li>
);

Location.propTypes = {
  data: PropTypes.object.isRequired,
  handleRemoval: PropTypes.func.isRequired,
};

export default Location;
