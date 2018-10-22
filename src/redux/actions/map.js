export const MAP_CENTER_LOADING = 'MAP_CENTER_LOADING';
export const MAP_CENTER_LOADING_FINISHED = 'MAP_CENTER_LOADING_FINISHED';
export const MAP_CENTER_FROM_LATEST_LOCATION =
  'MAP_CENTER_FROM_LATEST_LOCATION';
export const MAP_UPDATE_ZOOM_VALUE = 'MAP_UPDATE_ZOOM_VALUE';

export const MAP_CENTER_FROM_RECOMMENDATION_COORDS =
  'MAP_CENTER_FROM_RECOMMENDATION_COORDS';

export const mapCenterLoading = {
  type: MAP_CENTER_LOADING,
};

export const mapCenterLoadingFinished = {
  type: MAP_CENTER_LOADING_FINISHED,
};

export const setMapCenterFromLatestLocations = coords => ({
  type: MAP_CENTER_FROM_LATEST_LOCATION,
  payload: { ...coords },
});

export const centerMapToRecommendation = coords => ({
  type: MAP_CENTER_FROM_RECOMMENDATION_COORDS,
  payload: { ...coords },
});

export const updateMapZoomValue = zoom => ({
  type: MAP_UPDATE_ZOOM_VALUE,
  payload: zoom,
});
