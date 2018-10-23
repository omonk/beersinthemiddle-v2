import { combineReducers } from 'redux';
import locations from './locations';
import geolocation from './geo-location';
import map from './map';
import recommendations from './recommendations';
import ui from './ui';

export default combineReducers({
  locations,
  geolocation,
  map,
  recommendations,
  ui,
});
