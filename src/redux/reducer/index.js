import { combineReducers } from 'redux';
import locations from './locations';
import geolocation from './geo-location';
import map from './map';

export default combineReducers({ locations, geolocation, map });
