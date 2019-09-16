import { TOGGLE_SEARCH_BOX_HIDDEN } from '../actions/ui';
import { SET_RECOMMENDATIONS_LOADING } from '../actions/recommendations';

const initialState = {
  searchBoxIsHidden: false,
  recommendationsLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_RECOMMENDATIONS_LOADING:
      return {
        ...state,
        recommendationsLoading: !state.recommendationsLoading,
      };
    case TOGGLE_SEARCH_BOX_HIDDEN:
      return {
        ...state,
        searchBoxIsHidden: action.payload ? action.payload : !state.searchBoxIsHidden,
      };
    default:
      return state;
  }
};
