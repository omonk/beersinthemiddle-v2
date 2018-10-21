import React from 'react';
import { connect } from 'react-redux';
import { removeLocation } from '../../redux/actions/locations';
import Location from './location';

const Locations = ({ locations, handleRemoval }) =>
  locations && locations.length ? (
    <ul>
      {locations.map((location, i) => (
        <Location
          key={location.placeId}
          handleRemoval={handleRemoval}
          data={location}
        />
      ))}
    </ul>
  ) : null;

const mapStateToProps = ({ locations }) => ({
  locations,
});

const mapDispatchToProps = dispatch => ({
  handleRemoval: placeId => {
    console.log('jhahah');
    dispatch(removeLocation(placeId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Locations);
