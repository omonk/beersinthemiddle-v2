import {
  MAP_CENTER_LOADING,
  MAP_CENTER_LOADING_FINISHED,
  MAP_CENTER_FROM_LATEST_LOCATION,
} from '../actions/map';

import { SET_AVERAGE_LAT_LNG } from '../actions/recommendations';

const initialState = {
  mapCenterLoading: false,
  center: { lat: 51.48431530675587, lng: -0.1216834827836015 },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case MAP_CENTER_LOADING:
      return {
        ...state,
        mapCenterLoading: true,
      };
    case MAP_CENTER_LOADING_FINISHED:
      return {
        ...state,
        mapCenterLoading: false,
      };
    case SET_AVERAGE_LAT_LNG:
      return {
        ...state,
        averageLatLng: action.payload,
      };
    case MAP_CENTER_FROM_LATEST_LOCATION:
      console.log('fired');
      return {
        ...state,
        center: action.payload,
      };
    default:
      return state;
  }
};
