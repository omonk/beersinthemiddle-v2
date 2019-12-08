import { UPDATE_SAVED_SEARCHES } from '../actions/saved-searches';

const initialState = JSON.parse(localStorage.getItem('previous-searches')) || [];

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SAVED_SEARCHES:
      return action.payload;
    default:
      return state;
  }
};
