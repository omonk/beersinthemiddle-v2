import { FOUR_SQUARE_REQUEST_SUCCESS } from '../actions/recommendations';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FOUR_SQUARE_REQUEST_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
