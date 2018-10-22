import { push } from 'connected-react-router';
import { getLatLngMidPoint } from '../selectors/locations/locations';
import { setMapCenterFromLatestLocations } from './map';

export const FOUR_SQUARE_REQUEST = 'FOUR_SQUARE_REQUEST';
export const FOUR_SQUARE_REQUEST_SUCCESS = 'FOUR_SQUARE_REQUEST_SUCCESS';
export const FOUR_SQUARE_REQUEST_ERROR = 'FOUR_SQUARE_REQUEST_ERROR';
export const SET_AVERAGE_LAT_LNG = 'SET_AVERAGE_LAT_LNG';

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

export default () => (dispatch, getState) => {
  const { lat, lng } = getLatLngMidPoint(getState());

  if (lat && lng) {
    dispatch(setAverageLatLng({ lat, lng }));
    dispatch(recommendationsRequest);
    dispatch(push(`/search?ll=${lat},${lng}`));

    fetch(`/api/foursquare?ll=${lat},${lng}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        dispatch(setMapCenterFromLatestLocations({ lat, lng }, 16));
        dispatch(recommendationsSuccess(res));
      })
      .catch(err => {
        dispatch(recommendationsError(err));
      });
  }
};
