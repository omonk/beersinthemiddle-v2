import {
  GEO_LOCATION_SUCCESS,
  GEO_LOCATION_REQUEST,
  GEO_LOCATION_ERROR,
} from '../actions/geo-location';
const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GEO_LOCATION_REQUEST:
      return {
        ...state,
        isRequesting: true,
        hasError: false,
      };
    case GEO_LOCATION_SUCCESS:
      return {
        ...action.payload,
        isRequesting: false,
        hasError: false,
      };
    case GEO_LOCATION_ERROR:
      return {
        ...action.payload,
        isRequesting: false,
        hasError: true,
      };
    default:
      return state;
  }
};
