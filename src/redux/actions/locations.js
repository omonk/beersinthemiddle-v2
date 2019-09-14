import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import randomColor from 'randomcolor';
import { setMapCenterFromLatestLocations } from './map';
export const ADD_LOCATION = 'ADD_LOCATION';
export const ADD_LOCATION_SUCCESS = 'ADD_LOCATION_SUCCESS';
export const ADD_LOCATION_ERROR = 'ADD_LOCATION_ERROR';
export const REMOVE_LOCATION = 'REMOVE_LOCATION';

const addLocationSuccess = payload => ({
  type: ADD_LOCATION_SUCCESS,
  payload,
});

const addLocationError = payload => ({
  type: ADD_LOCATION_ERROR,
  payload,
});

export const addLocationFromGeoLocation = pos => (dispatch, getState) => {
  const { longitude, latitude } = pos.coords;
  fetch(`/api/reverse-geocode?lat=${latitude}&lng=${longitude}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(res => {
      console.log(randomColor());
      dispatch({
        type: ADD_LOCATION_SUCCESS,
        payload: {
          address: res.address,
          lat: latitude,
          lng: longitude,
          placeId: res.placeId,
          color: randomColor(),
        },
      });
      dispatch(
        setMapCenterFromLatestLocations({ lat: latitude, lng: longitude })
      );
    });
};

export const addLocation = ({ address, placeId }) => (dispatch, getState) => {
  geocodeByAddress(address)
    .then(results => getLatLng(results[0]))
    .then(({ lat, lng }) => {
      dispatch(setMapCenterFromLatestLocations({ lat, lng }));
      dispatch(addLocationSuccess({ address, lat, lng, placeId }));
    })
    .catch(err => dispatch(addLocationError(err)));
};

export const removeLocation = placeId => ({
  type: REMOVE_LOCATION,
  payload: placeId,
});
