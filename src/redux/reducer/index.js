import { combineReducers } from 'redux';
import locations from './locations';
import geolocation from './geo-location';
export default combineReducers({ locations, geolocation });
