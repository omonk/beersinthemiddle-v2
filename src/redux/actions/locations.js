import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import randomColor from 'randomcolor';
import { setMapCenterFromLatestLocations } from './map';
import { SET_AVERAGE_LAT_LNG } from './recommendations';
import getRecommendations from './recommendations';
import { toggleSavedSearches } from './ui';

export const ADD_LOCATION = 'ADD_LOCATION';
export const ADD_LOCATION_SUCCESS = 'ADD_LOCATION_SUCCESS';
export const ADD_LOCATION_ERROR = 'ADD_LOCATION_ERROR';
export const REMOVE_LOCATION = 'REMOVE_LOCATION';
export const ADD_MULTIPLE_LOCATIONS = 'ADD_MULTIPLE_LOCATIONS';

const createColor = (luminosity = 'dark') =>
  randomColor({
    luminosity,
  });

const addMultipleLocations = payload => {
  return {
    type: ADD_MULTIPLE_LOCATIONS,
    payload,
  };
};

const addLocationSuccess = payload => {
  return {
    type: ADD_LOCATION_SUCCESS,
    payload,
  };
};

const addLocationError = payload => ({
  type: ADD_LOCATION_ERROR,
  payload,
});

export const addLocationFromGeoLocation = pos => (dispatch, getState) => {
  const { longitude, latitude } = pos.coords;
  const { locations } = getState();

  const hasLocationAlready = locations.some(({ lat, lng }) => lat === latitude && lng === longitude);

  return hasLocationAlready
    ? null
    : fetch(`/api/reverse-geocode?lat=${latitude}&lng=${longitude}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(res => {
          dispatch({
            type: ADD_LOCATION_SUCCESS,
            payload: {
              address: res.address,
              lat: latitude,
              lng: longitude,
              placeId: res.placeId,
              color: createColor(),
            },
          });
          dispatch(
            setMapCenterFromLatestLocations({
              lat: latitude,
              lng: longitude,
              zoom: 12,
            }),
          );
        });
};

export const addLocation = ({ address, placeId }) => (dispatch, getState) => {
  geocodeByAddress(address)
    .then(results => getLatLng(results[0]))
    .then(({ lat, lng }) => {
      dispatch(setMapCenterFromLatestLocations({ lat, lng }));
      dispatch(addLocationSuccess({ address, lat, lng, placeId, color: createColor() }));
    })
    .catch(err => dispatch(addLocationError(err)));
};

export const newRequestFromSavedSearch = ({ locations, locationsMidPoint, keyword = [] }) => dispatch => {
  dispatch(toggleSavedSearches(false));
  dispatch({
    type: SET_AVERAGE_LAT_LNG,
    payload: locationsMidPoint,
  });
  dispatch(addMultipleLocations(locations));
  dispatch(getRecommendations({ keyword }));
};

export const removeLocation = placeId => ({
  type: REMOVE_LOCATION,
  payload: placeId,
});
