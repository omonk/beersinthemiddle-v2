import { TOGGLE_SEARCH_BOX_HIDDEN, TOGGLE_SAVED_SEARCHES_PANEL } from '../actions/ui';
import { SET_RECOMMENDATIONS_LOADING } from '../actions/recommendations';

const initialState = {
  searchBoxIsHidden: false,
  loadSearchBoxIsHidden: true,
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
    case TOGGLE_SAVED_SEARCHES_PANEL:
      return {
        searchBoxIsHidden: false,
        loadSearchBoxIsHidden: action.payload ? action.payload : !state.loadSearchBoxIsHidden,
      };
    default:
      return state;
  }
};
