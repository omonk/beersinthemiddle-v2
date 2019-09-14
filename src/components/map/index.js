import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';
import { generate } from 'shortid';

import locationsMetaData from '../../assets/marker-points.json';
import LocationMarker from './components/locationMarker';
import LocationMidPointMarker from './components/locationMidPointMarker';
import RecommendationsMarker from './components/recommendationsMarker';

class MapContainer extends Component {
  render() {
    const {
      zoom,
      locations,
      locationsMidPoint,
      recommendations,
      updateMapZoomValue,
      center,
      google,
    } = this.props;
    return (
      <Map
        google={google}
        center={{ ...center }}
        zoom={zoom}
        defaultZoom={16}
        onChange={event => {
          if (event.zoom !== zoom) {
            updateMapZoomValue(event.zoom);
          }
        }}
        bootstrapURLKeys={{
          key: 'AIzaSyDG__8gKSiqXL2IG1ji5CCUNigEVSU3E0c',
          language: 'en',
        }}
      >
        {locationsMidPoint &&
          locationsMidPoint.lat &&
          locationsMidPoint.lng && (
            <LocationMidPointMarker
              lat={locationsMidPoint.lat}
              lng={locationsMidPoint.lng}
              text={locationsMidPoint.label}
            />
          )}

        {locations &&
          locations.map((location, i) => (
            <LocationMarker
              key={generate()}
              lat={location.lat}
              lng={location.lng}
              text=""
              color={locationsMetaData.locations[i].color}
            />
          ))}

        {recommendations &&
          recommendations.length > 0 &&
          recommendations.map((recommendation, index) => (
            <RecommendationsMarker
              key={generate()}
              lat={recommendation.location.lat}
              lng={recommendation.location.lng}
              data={recommendation}
              text=""
              index={index}
            />
          ))}
      </Map>
    );
  }
}

Map.propTypes = {
  locations: PropTypes.array.isRequired,
  locationsMidPoint: PropTypes.object,
  center: PropTypes.object.isRequired,
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDG__8gKSiqXL2IG1ji5CCUNigEVSU3E0c',
})(MapContainer);
