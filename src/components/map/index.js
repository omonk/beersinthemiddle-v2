import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import { generate } from 'shortid';

import locationsMetaData from '../../assets/markerPoints.json';
import LocationMarker from './components/locationMarker';
import LocationMidPointMarker from './components/locationMidPointMarker';
import RecommendationsMarker from './components/recommendationsMarker';

class Map extends Component {
  render() {
    const {
      center,
      zoom,
      locations,
      locationsMidPoint,
      recommendations,
    } = this.props;

    return (
      <GoogleMapReact
        center={center}
        defaultZoom={zoom}
        bootstrapURLKeys={{
          key: 'AIzaSyC4yjCTPVzFZx0Fj0P9mSei1btoPQexc0s',
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
      </GoogleMapReact>
    );
  }
}

Map.defaultProps = {
  center: {
    lat: 59.95,
    lng: 30.33,
  },
  zoom: 11,
};

Map.propTypes = {
  locations: PropTypes.array.isRequired,
  locationsMidPoint: PropTypes.object,
};

export default Map;
