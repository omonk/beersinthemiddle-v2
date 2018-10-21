import React from 'react';
import { connect } from 'react-redux';
import SearchForm from './search-form';
import geoLocationRequest from '../../redux/actions/geo-location';
import { addLocation } from '../../redux/actions/locations';

const SearchFormContainer = props => {
  return <SearchForm {...props} />;
};

const mapStateToProps = ({ geolocation }) => {
  return {
    geolocation: geolocation,
  };
};

const mapDispatchToProps = (dispatch, state) => {
  return {
    geoLocationRequest: () => dispatch(geoLocationRequest),
    addLocationToState: (address, placeId) => {
      dispatch(addLocation({ address, placeId }));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFormContainer);
