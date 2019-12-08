export const UPDATE_SAVED_SEARCHES = 'UPDATE_SAVED_SEARCHES';

export const updateSavedSearches = locations => {
  const previousSearches = JSON.parse(localStorage.getItem('previous-searches')) || [];
  const newSearches = [...previousSearches, { date: Date.now(), locations }];

  localStorage.setItem('previous-searches', JSON.stringify(newSearches));

  return { type: UPDATE_SAVED_SEARCHES, payload: newSearches };
};
