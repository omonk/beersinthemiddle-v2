import { combineReducers } from 'redux';
import locations from './locations';
import geolocation from './geo-location';
import map from './map';
import recommendations from './recommendations';
import ui from './ui';
import { connectRouter } from 'connected-react-router';

export default history =>
  combineReducers({
    router: connectRouter(history),
    locations,
    geolocation,
    map,
    recommendations,
    ui,
  });
