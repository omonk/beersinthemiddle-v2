import React from 'react';
import { connect } from 'react-redux';
import SearchForm from './search-form';
import geoLocationRequest from '../../redux/actions/geo-location';
import { addLocation } from '../../redux/actions/locations';

const SearchFormContainer = props => {
  return <SearchForm {...props} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFormContainer);
