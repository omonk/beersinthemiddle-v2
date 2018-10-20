import {
  GEO_LOCATION_SUCCESS,
  GEO_LOCATION_REQUEST,
} from '../actions/geo-location';
const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GEO_LOCATION_REQUEST:
      return {
        ...state,
        isRequesting: true,
      };
    case GEO_LOCATION_SUCCESS:
      return {
        ...action.payload,
        isRequesting: false,
      };
    default:
      return state;
  }
};
