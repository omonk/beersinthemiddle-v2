import {
  MAP_CENTER_LOADING,
  MAP_CENTER_LOADING_FINISHED,
  MAP_CENTER_FROM_LATEST_LOCATION,
  MAP_CENTER_FROM_RECOMMENDATION_COORDS,
  MAP_UPDATE_ZOOM_VALUE,
} from '../actions/map';

import { SET_AVERAGE_LAT_LNG } from '../actions/recommendations';

const initialState = {
  mapCenterLoading: false,
  center: { lat: 51.48431530675587, lng: -0.1216834827836015 },
  zoom: 11,
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
        locationsMidPoint: action.payload,
      };
    case MAP_UPDATE_ZOOM_VALUE:
      return {
        ...state,
        zoom: action.payload,
      };
    case MAP_CENTER_FROM_RECOMMENDATION_COORDS:
    case MAP_CENTER_FROM_LATEST_LOCATION:
      const { lat, lng, zoom } = action.payload;
      return {
        center: { lat, lng },
        zoom: zoom ? zoom : state.zoom,
      };
    default:
      return state;
  }
};
