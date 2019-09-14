import { push } from 'connected-react-router';
import { getLatLngMidPoint } from '../selectors/locations/locations';
import { setMapCenterFromLatestLocations } from './map';
import { toggleSearchBoxHidden } from './ui';

export const FOUR_SQUARE_REQUEST = 'FOUR_SQUARE_REQUEST';
export const FOUR_SQUARE_REQUEST_SUCCESS = 'FOUR_SQUARE_REQUEST_SUCCESS';
export const FOUR_SQUARE_REQUEST_ERROR = 'FOUR_SQUARE_REQUEST_ERROR';
export const SET_AVERAGE_LAT_LNG = 'SET_AVERAGE_LAT_LNG';
export const SET_RECOMMENDATIONS_LOADING = 'SET_RECOMMENDATIONS_LOADING';

const recommendationsRequest = () => ({
  type: FOUR_SQUARE_REQUEST,
});

const recommendationsSuccess = payload => ({
  type: FOUR_SQUARE_REQUEST_SUCCESS,
  payload,
});

const recommendationsError = err => ({
  type: FOUR_SQUARE_REQUEST_ERROR,
  payload: err,
});

const setAverageLatLng = payload => ({
  type: SET_AVERAGE_LAT_LNG,
  payload,
});

export default ({ types }) => (dispatch, getState) => {
  const { lat, lng } = getLatLngMidPoint(getState());

  if (lat && lng) {
    const query = `?lat=${lat}&lng=${lng}&types=${types.join(',')}`;

    dispatch(setAverageLatLng({ lat, lng }));
    dispatch(recommendationsRequest);
    dispatch({
      type: SET_RECOMMENDATIONS_LOADING,
    });
    dispatch(push(`/search${query}`));

    fetch(`/api/foursquare${query}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        dispatch(setMapCenterFromLatestLocations({ lat, lng }, 12));
        dispatch(recommendationsSuccess(res));
        dispatch({
          type: SET_RECOMMENDATIONS_LOADING,
        });
        dispatch(toggleSearchBoxHidden);
      })
      .catch(err => {
        dispatch({
          type: SET_RECOMMENDATIONS_LOADING,
        });
        dispatch(recommendationsError(err));
      });
  }
};
