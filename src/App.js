import React, { useRef } from 'react';
import './scss/App.scss';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';

import SearchForm from './components/search-form/search-form-container';
import SavedSearches from './components/saved-searches/saved-searches';
import Map from './components/map';
import Recommendations from './components/recommendations/recommendations';

import { updateMapZoomValue, centerMapToRecommendation } from './redux/actions/map';
import { hasRecommendationsSelector } from './redux/selectors/recommendations/recommendations';
import iconLibrary from './utils/icons';
import styled from '@emotion/styled';

iconLibrary();

ReactGA.initialize('UA-59770883-3');

const Search = styled.div`
  z-index: 10;
  position: absolute;
  top: 0;
  transition: transform ease-in-out 400ms;

  width: 100%;
  min-height: 500px;
  max-height: 100vh;
  overflow: scroll;
  background-color: white;
  padding: 0.75rem;
  border: 1px solid #b5b5b5;
  border-radius: 5px;
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.2);
  overflow-x: hidden;

  ${({ searchIsHidden }) =>
    searchIsHidden
      ? `
    transform: translateY(-75%);
    overflow: hidden;
  `
      : ''}
  ${({ isHidden }) => (isHidden ? 'transform: translateX(-105%);' : '')} 
  
  @media screen and (min-width: 768px) {
    margin: 5px;
    width: 33.3%;
    padding: #{$search-padding};
  }

  @media screen and (min-width: 1024px) {
    width: 25%;
  }
`;

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
  loadSearchBoxIsHidden,
  isRecommendationsLoading,
}) => {
  const searchFormRef = useRef(null);
  return (
    <div className="App">
      <Search ref={searchFormRef} searchIsHidden={searchBoxIsHidden}>
        <SearchForm searchBoxRef={searchFormRef} />
      </Search>
      <Search isHidden={loadSearchBoxIsHidden}>
        <SavedSearches />
      </Search>

      <Recommendations data={recommendations} centerMapToRecommendation={centerMapToRecommendation} />

      <div className="map__wrapper--outer">
        <div className="map__wrapper--inner">
          <Map
            center={center}
            zoom={zoom}
            locations={locations}
            locationsMidPoint={locationsMidPoint}
            recommendations={recommendations}
            updateMapZoomValue={updateMapZoomValue}
            isLoading={isRecommendationsLoading}
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
    loadSearchBoxIsHidden: ui.loadSearchBoxIsHidden,
    isRecommendationsLoading: ui.recommendationsLoading,
  };
};

const mapDispatchToProps = (dispatch, state) => {
  return {
    updateMapZoomValue: zoom => dispatch(updateMapZoomValue(zoom)),
    centerMapToRecommendation: (lat, lng) => dispatch(centerMapToRecommendation(lat, lng)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
