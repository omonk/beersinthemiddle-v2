export const ADD_LOCATION = 'ADD_LOCATION';

export const addLocations = payload => dispatch => {
  dispatch({
    type: ADD_LOCATION,
    payload,
  });
};
