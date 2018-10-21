import React from 'react';
import './scss/App.scss';

import { connect } from 'react-redux';

import SearchForm from './components/search-form/search-form';
import Locations from './components/locations';
import Map from './components/map';

import geoLocationRequest from './redux/actions/geo-location';
import { addLocation, removeLocation } from './redux/actions/locations';
import getRecommendations from './redux/actions/recommendations';

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
}) => {
  return (
    <div className="App">
      <section className="search box">
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
      </section>
      <div className="map__wrapper--outer">
        {mapCenterLoading && (
          <div className="map__loading">
            <p>Map center loading...</p>
          </div>
        )}
        <div className="map__wrapper--inner">
          <Map
            center={geolocation}
            locations={locations}
            locationsMidPoint={locationsMidPoint}
            recommendations={recommendations}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  locations,
  geolocation,
  locationsMidPoint,
  recommendations,
}) => {
  return {
    geolocation,
    locations,
    locationsMidPoint,
    recommendations,
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
