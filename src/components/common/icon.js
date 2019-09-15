import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({ size = 'medium', icon }) => (
  <span class={`icon is-${size}`}>
    <FontAwesomeIcon icon={icon} />
  </span>
);
