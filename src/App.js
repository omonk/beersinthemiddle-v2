import React from 'react';
import './scss/App.scss';

import { connect } from 'react-redux';

import SearchForm from './components/search-form/search-form';
import Locations from './components/locations';
import Map from './components/map';
import Recommendations from './components/recommendations/recommendations';

import geoLocationRequest from './redux/actions/geo-location';
import { addLocation, removeLocation } from './redux/actions/locations';
import getRecommendations from './redux/actions/recommendations';
import { toggleSearchBoxHidden } from './redux/actions/ui';
import {
  updateMapZoomValue,
  centerMapToRecommendation,
} from './redux/actions/map';
import { hasRecommendationsSelector } from './redux/selectors/recommendations/recommendations';

const App = ({
  locations,
  addLocationToState,
  geoLocationRequest,
  geolocation,
  handleRemoval,
  locationsMidPoint,
  mapCenterLoading,
  fourSquareRequest,
  recommendations,
  centerMapToRecommendation,
  updateMapZoomValue,
  center,
  zoom,
  searchBoxIsHidden,
  hasRecommendations,
  toggleSearchBox,
}) => {
  return (
    <div className=" App">
      <section
        className={`search ${searchBoxIsHidden ? 'search--is-hidden' : ''}`}
      >
        <div className="box">
          <SearchForm
            addLocationToState={addLocationToState}
            geoLocationRequest={geoLocationRequest}
            geolocation={geolocation}
          />
          <Locations locations={locations} handleRemoval={handleRemoval} />
          {locations.length > 1 && (
            <button className="button is-primary" onClick={fourSquareRequest}>
              Find the best places to eat/drink
            </button>
          )}
          <div onClick={() => (hasRecommendations ? toggleSearchBox() : null)}>
            CLICK HERE
          </div>
        </div>
      </section>
      <Recommendations
        data={recommendations}
        centerMapToRecommendation={centerMapToRecommendation}
      />

      <div className="map__wrapper--outer">
        {mapCenterLoading && (
          <div className="map__loading">
            <p>Map center loading...</p>
          </div>
        )}
        <div className="map__wrapper--inner">
          <Map
            center={center}
            zoom={zoom}
            locations={locations}
            locationsMidPoint={locationsMidPoint}
            recommendations={recommendations}
            updateMapZoomValue={updateMapZoomValue}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const { locations, geolocation, recommendations, map, ui } = state;

  const hasRecommendations = hasRecommendationsSelector(state);
  return {
    geolocation,
    locations,
    center: map.center,
    zoom: map.zoom,
    locationsMidPoint: map.locationsMidPoint,
    recommendations,
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
    fourSquareRequest: () => dispatch(getRecommendations()),
    centerMapToRecommendation: coords =>
      dispatch(centerMapToRecommendation(coords)),
    updateMapZoomValue: zoom => dispatch(updateMapZoomValue(zoom)),
    toggleSearchBox: () => dispatch(toggleSearchBoxHidden),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
