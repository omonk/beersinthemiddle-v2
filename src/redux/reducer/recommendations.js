import { FOUR_SQUARE_REQUEST_SUCCESS } from '../actions/recommendations';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FOUR_SQUARE_REQUEST_SUCCESS:
      console.log({ action });
      return action.payload;
    default:
      return state;
  }
};
