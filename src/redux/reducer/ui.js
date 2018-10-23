import { TOGGLE_SEARCH_BOX_HIDDEN } from '../actions/ui';

const initialState = {
  searchBoxIsHidden: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SEARCH_BOX_HIDDEN:
      return {
        ...state,
        searchBoxIsHidden: !state.searchBoxIsHidden,
      };
    default:
      return state;
  }
};
