import hash from 'hash-obj';

export const UPDATE_SAVED_SEARCHES = 'UPDATE_SAVED_SEARCHES';

export const updateSavedSearches = ({ locations, locationsMidPoint, keyword }) => {
  const previousSearches = JSON.parse(localStorage.getItem('previous-searches')) || [];
  const newSearchData = {
    locations,
    locationsMidPoint,
    keyword,
  };

  const newSearchDataHash = hash(newSearchData);
  const shouldAddNewSearch = previousSearches.every(({ hash }) => hash !== newSearchDataHash);

  if (shouldAddNewSearch) {
    const newSearches = [...previousSearches, { ...newSearchData, date: Date.now(), hash: newSearchDataHash }];

    localStorage.setItem('previous-searches', JSON.stringify(newSearches));
    return { type: UPDATE_SAVED_SEARCHES, payload: newSearches };
  }

  return { type: UPDATE_SAVED_SEARCHES, payload: previousSearches };
};
