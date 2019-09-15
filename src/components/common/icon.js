import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({ size = 'medium', className = '', iconSize, icon, color }) => {
  return (
    <span className={`icon is-${size} ${className}`}>
      <FontAwesomeIcon icon={icon} size={iconSize} color={color} />
    </span>
  );
};
