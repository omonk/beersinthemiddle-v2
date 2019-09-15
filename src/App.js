import React from 'react';
import './scss/App.scss';

import { connect } from 'react-redux';

import SearchForm from './components/search-form/search-form-container';
import Map from './components/map';
import Recommendations from './components/recommendations/recommendations';

import {
  updateMapZoomValue,
  centerMapToRecommendation,
} from './redux/actions/map';
import { hasRecommendationsSelector } from './redux/selectors/recommendations/recommendations';

const App = ({
  locations,
  locationsMidPoint,
  mapCenterLoading,
  recommendations,
  centerMapToRecommendation,
  updateMapZoomValue,
  center,
  zoom,
  searchBoxIsHidden,
}) => {
  return (
    <div className="App">
      <section
        className={`search ${searchBoxIsHidden ? 'search--is-hidden' : ''}`}
      >
        <div className="box">
          <SearchForm />
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
  const { locations, recommendations, map, ui } = state;

  const hasRecommendations = hasRecommendationsSelector(state);

  return {
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
    updateMapZoomValue: zoom => dispatch(updateMapZoomValue(zoom)),
    centerMapToRecommendation: (lat, lng) =>
      dispatch(centerMapToRecommendation(lat, lng)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
