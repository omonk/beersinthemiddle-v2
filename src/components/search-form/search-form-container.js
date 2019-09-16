import React from 'react';
import { connect } from 'react-redux';
import SearchForm from './search-form';
import geoLocationRequest from '../../redux/actions/geo-location';
import { hasRecommendationsSelector } from '../../redux/selectors/recommendations/recommendations';
import getRecommendations from '../../redux/actions/recommendations';
import { addLocation, removeLocation } from '../../redux/actions/locations';
import { toggleSearchBoxHidden } from '../../redux/actions/ui';

const SearchFormContainer = props => {
  return <SearchForm {...props} />;
};

const mapStateToProps = state => {
  const { locations, geolocation, recommendations, map, ui } = state;
  const hasRecommendations = hasRecommendationsSelector(state);

  return {
    geolocation,
    locations,
    isLoading: ui.recommendationsLoading,
    isGeoLocating: geolocation.isRequesting,
    isGeoLocatingError: geolocation.hasError,
    center: map.center,
    zoom: map.zoom,
    locationsMidPoint: map.locationsMidPoint,
    recommendations: recommendations.locations,
    hasRecommendations,
    searchBoxIsHidden: ui.searchBoxIsHidden,
  };
};

const mapDispatchToProps = (dispatch, state) => {
  return {
    geoLocationRequest: () => dispatch(geoLocationRequest),
    addLocationToState: (address, placeId) => {
      dispatch(addLocation({ address, placeId }));
    },
    handleRemoval: placeId => dispatch(removeLocation(placeId)),
    fourSquareRequest: values => dispatch(getRecommendations(values)),
    toggleSearchBox: () => dispatch(toggleSearchBoxHidden()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchFormContainer);
