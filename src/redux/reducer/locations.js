import { ADD_LOCATION_SUCCESS, ADD_LOCATION_ERROR } from '../actions/locations';
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOCATION_SUCCESS:
      console.log(action.payload);
      return [...state, action.payload];
    case ADD_LOCATION_ERROR:
    default:
      return state;
  }
};
