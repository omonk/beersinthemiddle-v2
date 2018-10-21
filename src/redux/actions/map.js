export const MAP_CENTER_LOADING = 'MAP_CENTER_LOADING';
export const MAP_CENTER_LOADING_FINISHED = 'MAP_CENTER_LOADING_FINISHED';
export const MAP_CENTER_FROM_LATEST_LOCATION = 'MAP_CENTER_LOADING_FINISHED';

export const mapCenterLoading = {
  type: MAP_CENTER_LOADING,
};

export const mapCenterLoadingFinished = {
  type: MAP_CENTER_LOADING_FINISHED,
};

export const setMapCenterFromLatestLocations = payload => ({
  type: MAP_CENTER_FROM_LATEST_LOCATION,
  payload,
});
