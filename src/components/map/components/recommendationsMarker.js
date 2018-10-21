import React from 'react';
import classnames from 'classnames';

export default ({ $hover, data, index }) => (
  <div className={classnames('recommendation', {
    'recommendation--hovered': $hover,
  })}
  >
    <div className="recommendation__marker">
      <p>{index + 1}</p>
    </div>
    {$hover ?
      <div className="recommendation__hover-box">
        <p>
          {data.title}
        </p>
        <p>
          {data.address}
        </p>
        <p>{data.review}</p>
      </div>
      : null}
  </div>
);
