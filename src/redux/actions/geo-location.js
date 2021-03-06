import { mapCenterLoading, mapCenterLoadingFinished } from './map';
import { addLocationFromGeoLocation } from './locations';

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

const geoLocationError = (err = undefined) => ({
  type: GEO_LOCATION_ERROR,
  err,
});

export default (dispatch, state) => {
  dispatch(requestingGeoLocation);
  dispatch(mapCenterLoading);

  return navigator.geolocation.getCurrentPosition(
    pos => {
      dispatch(addLocationFromGeoLocation(pos));
      dispatch(geoLocationSuccess(pos));
      dispatch(mapCenterLoadingFinished);
    },
    error => {
      console.log(error);
      dispatch(geoLocationError(error));
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
};
