import React from 'react';
const Location = ({ data, handleRemoval }) => (
  <li>
    <p>{data.address}</p>
    <button onClick={() => handleRemoval(data.placeId)}>X</button>
  </li>
);

export default Location;
