import React from 'react';
import { connect } from 'react-redux';
import SearchForm from './search-form';
import geoLocationRequest from '../../redux/actions/geo-location';
import { hasRecommendationsSelector } from '../../redux/selectors/recommendations/recommendations';
import getRecommendations from '../../redux/actions/recommendations';
import { addLocation, removeLocation } from '../../redux/actions/locations';
import { toggleSavedSearches, toggleSearchBoxHidden } from '../../redux/actions/ui';

const SearchFormContainer = props => {
  return <SearchForm {...props} />;
};

const mapStateToProps = (state, ownProps) => {
  const { locations, geolocation, recommendations, map, ui } = state;
  const hasRecommendations = hasRecommendationsSelector(state);

  return {
    ...ownProps,
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
    loadSearchBoxIsHidden: ui.loadSearchBoxIsHidden,
  };
};

const mapDispatchToProps = (dispatch, state) => {
  return {
    geoLocationRequest: () => dispatch(geoLocationRequest),
    addLocationToState: (address, placeId) => {
      dispatch(addLocation({ address, placeId }));
    },
    handleRemoval: placeId => dispatch(removeLocation(placeId)),
    requestLocations: values => dispatch(getRecommendations(values)),
    toggleSearchBox: () => dispatch(toggleSearchBoxHidden()),
    toggleSavedSearches: () => dispatch(toggleSavedSearches()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchFormContainer);
