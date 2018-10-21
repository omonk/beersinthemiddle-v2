import React from 'react';
import './scss/App.scss';

import { connect } from 'react-redux';

import SearchForm from './components/search-form/search-form';
import Locations from './components/locations';
import Map from './components/map';

import geoLocationRequest from './redux/actions/geo-location';
import { addLocation, removeLocation } from './redux/actions/locations';

const App = ({
  locations,
  addLocationToState,
  geoLocationRequest,
  geolocation,
  handleRemoval,
  locationsMidPoint,
  mapCenterLoading,
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
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ locations, geolocation, locationsMidPoint }) => {
  return {
    geolocation,
    locations,
    locationsMidPoint,
  };
};

const mapDispatchToProps = (dispatch, state) => {
  return {
    geoLocationRequest: () => dispatch(geoLocationRequest),
    addLocationToState: (address, placeId) => {
      dispatch(addLocation({ address, placeId }));
    },
    handleRemoval: placeId => dispatch(removeLocation(placeId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
