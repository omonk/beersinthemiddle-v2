import { createSelector } from 'reselect';
import getLatLngMidpoint from '../../../utils/get-lat-lng-midpoint';

const locationsSelector = state => state.locations;

export const getLatLngMidPoint = createSelector(
  locationsSelector,
  getLatLngMidpoint
);
