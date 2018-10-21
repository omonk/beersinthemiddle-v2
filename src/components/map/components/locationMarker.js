import React from 'react';

export default ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    x="0px"
    y="0px"
    width="25px"
    height="25px"
    viewBox="0 0 61 85"
    enableBackground="new 0 0 61 85"
    xmlSpace="preserve"
  >
    <path fill={color || '#000000'} d="M31.75,0C48.318,0,61,12.488,61,29.057V30c0,21.834-19.322,49-29.75,55H31C20.572,79,0,51.834,0,30v-0.943  C0,12.488,13.932,0,30.5,0C30.667,0,31.583,0,31.75,0z" />
    <path fill={color || '#000000'} d="M31.688,2C47.428,2,59,13.989,59,29.729v0.896C59,51.367,41.119,77,31.212,83h-0.237  C21.069,77,2,51.367,2,30.625v-0.896C2,13.989,14.76,2,30.5,2C30.659,2,31.529,2,31.688,2z" />
  </svg>
);
