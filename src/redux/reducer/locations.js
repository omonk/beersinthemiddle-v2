import { ADD_LOCATION } from '../actions/locations';
const initialState = {};

export default (state = initialState, action, payload) => {
  switch (action.type) {
    case ADD_LOCATION:
      return {
        ...state.locations,
        payload,
      };
    default:
      return state;
  }
};
