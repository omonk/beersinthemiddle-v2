import React from 'react';
import PropTypes from 'prop-types';
const Location = ({ data, handleRemoval }) => (
  <li className="location-list-item">
    <p>{data.address}</p>
    <button className="delete" onClick={() => handleRemoval(data.placeId)} />
  </li>
);

Location.propTypes = {
  data: PropTypes.object.isRequired,
  handleRemoval: PropTypes.func.isRequired,
};

export default Location;
