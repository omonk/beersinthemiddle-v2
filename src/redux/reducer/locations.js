import {
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION_ERROR,
  REMOVE_LOCATION,
} from '../actions/locations';
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOCATION_SUCCESS:
      console.log({ a: action.payload });
      return [...state, action.payload];
    case REMOVE_LOCATION:
      return state.filter(i => i.placeId !== action.payload);
    case ADD_LOCATION_ERROR:
    default:
      return state;
  }
};
