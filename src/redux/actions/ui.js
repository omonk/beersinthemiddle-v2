export const TOGGLE_SEARCH_BOX_HIDDEN = 'TOGGLE_SEARCH_BOX_HIDDEN';
export const TOGGLE_SAVED_SEARCHES_PANEL = 'TOGGLE_LOAD_SAVED_SEARCHES_PANEL';

export const toggleSearchBoxHidden = payload => ({
  type: TOGGLE_SEARCH_BOX_HIDDEN,
  payload,
});

export const toggleSavedSearches = payload => ({
  type: TOGGLE_SAVED_SEARCHES_PANEL,
  payload,
});
