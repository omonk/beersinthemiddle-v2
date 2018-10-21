import {
  MAP_CENTER_LOADING,
  MAP_CENTER_LOADING_FINISHED,
} from '../actions/map';

const initialState = {
  mapCenterLoading: false,
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
    default:
      return state;
  }
};
