import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../common/icon';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';

const Location = ({ data: { address, placeId, color }, handleRemoval }) => (
  <li className="location-list-item">
    <Icon icon={faMapMarker} size="small" color={color} />
    <p>{address}</p>
    <button className="delete" onClick={() => handleRemoval(placeId)} />
  </li>
);

Location.propTypes = {
  data: PropTypes.object.isRequired,
  handleRemoval: PropTypes.func.isRequired,
};

export default Location;
