export const GEO_LOCATION_REQUEST = 'GEO_LOCATION_REQUEST';
export const GEO_LOCATION_SUCCESS = 'GEO_LOCATION_SUCCESS';
export const GEO_LOCATION_ERROR = 'GEO_LOCATION_ERROR';

const requestingGeoLocation = {
  type: GEO_LOCATION_REQUEST,
};

const geoLocationSuccess = ({ coords }) => ({
  type: GEO_LOCATION_SUCCESS,
  payload: {
    lat: coords.latitude,
    lng: coords.longitude,
  },
});

const geoLocationError = (err = undefined) => {};

export default (dispatch, state) => {
  dispatch(requestingGeoLocation);
  return navigator.geolocation.getCurrentPosition(
    pos => {
      dispatch(geoLocationSuccess(pos));
    },
    geoLocationError,
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
};
