import React from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import { generate } from 'shortid';

import RecommendationsMarker from './components/recommendationsMarker';
import Icon from '../common/icon';
import { faMapMarker, faMapPin } from '@fortawesome/free-solid-svg-icons';

const MapContainer = ({ zoom, locations, locationsMidPoint, recommendations, updateMapZoomValue, center, google }) => {
  return (
    <GoogleMapReact
      google={google}
      center={{ ...center }}
      zoom={zoom}
      bootstrapURLKeys={{
        key: 'AIzaSyC2ZGN-eb5qpshvpy-ukQX1RSpZ3MTU_Ps',
      }}
      defaultZoom={16}
      onChange={event => {
        if (event.zoom !== zoom) {
          updateMapZoomValue(event.zoom);
        }
      }}
    >
      {locationsMidPoint && locationsMidPoint.lat && locationsMidPoint.lng && (
        <Icon
          icon={faMapPin}
          size="large"
          iconSize="3x"
          className="map__marker"
          lat={locationsMidPoint.lat}
          lng={locationsMidPoint.lng}
          text={locationsMidPoint.label}
        />
      )}

      {locations &&
        locations.map((location, i) => (
          <Icon
            key={generate()}
            icon={faMapMarker}
            className="map__marker"
            size="large"
            iconSize="3x"
            lat={location.lat}
            lng={location.lng}
            color={location.color}
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
};

MapContainer.propTypes = {
  locations: PropTypes.array.isRequired,
  locationsMidPoint: PropTypes.object,
  center: PropTypes.object.isRequired,
};

export default MapContainer;
