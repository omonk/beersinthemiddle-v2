import { push } from 'connected-react-router';
import { getLatLngMidPoint } from '../selectors/locations/locations';
import { setMapCenterFromLatestLocations } from './map';
import { toggleSearchBoxHidden } from './ui';
import { updateSavedSearches } from './saved-searches';

export const FOUR_SQUARE_REQUEST = 'FOUR_SQUARE_REQUEST';
export const FOUR_SQUARE_REQUEST_SUCCESS = 'FOUR_SQUARE_REQUEST_SUCCESS';
export const FOUR_SQUARE_REQUEST_ERROR = 'FOUR_SQUARE_REQUEST_ERROR';
export const SET_AVERAGE_LAT_LNG = 'SET_AVERAGE_LAT_LNG';
export const SET_RECOMMENDATIONS_LOADING = 'SET_RECOMMENDATIONS_LOADING';

const recommendationsSuccess = payload => ({ type: FOUR_SQUARE_REQUEST_SUCCESS, payload });

const recommendationsError = err => ({
  type: FOUR_SQUARE_REQUEST_ERROR,
  payload: err,
});

const setAverageLatLng = payload => ({
  type: SET_AVERAGE_LAT_LNG,
  payload,
});

export default ({ keyword = [], openNow = true, minprice = 0, maxprice = 4 }) => (dispatch, getState) => {
  const state = getState();
  const { lat, lng } = getLatLngMidPoint(state);
  const { locations } = state;

  if (lat && lng) {
    const query = `?lat=${lat}&lng=${lng}&keyword=${keyword.join(',')}`;

    dispatch(setAverageLatLng({ lat, lng }));
    dispatch({
      type: FOUR_SQUARE_REQUEST,
    });
    dispatch({
      type: SET_RECOMMENDATIONS_LOADING,
    });
    dispatch(push(`/search${query}`));

    fetch(`/api/places${query}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        const { recommendations } = res;
        dispatch(setMapCenterFromLatestLocations({ lat, lng }, 12));
        dispatch(recommendationsSuccess(recommendations));
        dispatch({
          type: SET_RECOMMENDATIONS_LOADING,
          payload: false,
        });
        dispatch(toggleSearchBoxHidden(true));
        const { map } = getState();
        dispatch(updateSavedSearches({ locations, locationsMidPoint: map.locationsMidPoint, keyword }));
      })
      .catch(err => {
        dispatch({
          type: SET_RECOMMENDATIONS_LOADING,
          payload: false,
        });
        console.log({ err });
        dispatch(recommendationsError(err));
      });
  }
};
