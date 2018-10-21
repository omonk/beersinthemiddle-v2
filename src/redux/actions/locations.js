import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
export const ADD_LOCATION = 'ADD_LOCATION';
export const ADD_LOCATION_SUCCESS = 'ADD_LOCATION_SUCCESS';
export const ADD_LOCATION_ERROR = 'ADD_LOCATION_ERROR';

const addLocationSuccess = ({ address, lat, lng }) => ({
  type: ADD_LOCATION_SUCCESS,
  payload: {
    address,
    lat,
    lng,
  },
});

const addLocationError = payload => ({
  type: ADD_LOCATION_ERROR,
  payload,
});

export const addLocation = ({ address }) => (dispatch, state) => {
  geocodeByAddress(address)
    .then(results => getLatLng(results[0]))
    .then(({ lat, lng }) => dispatch(addLocationSuccess({ address, lat, lng })))
    .catch(err => dispatch(addLocationError(err)));
};
