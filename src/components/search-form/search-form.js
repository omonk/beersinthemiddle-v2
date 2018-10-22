import React, { Component, Fragment } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import PropTypes from 'prop-types';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
    };
  }

  handleLocationSelect = (address, placeId) => {
    this.props.addLocationToState(address, placeId);
    this.setState({ inputValue: '' });
  };

  render() {
    const { geolocation, geoLocationRequest } = this.props;

    const { inputValue } = this.state;

    return (
      <Fragment>
        <h1 className="title is-small-mobile">
          Beers In The Middle.
          <span role="img" aria-label="beer">
            🍻
          </span>
        </h1>
        <p>Find the most convienient places to hang out with your friends</p>
        <form>
          <PlacesAutocomplete
            value={inputValue}
            onChange={value => this.setState({ inputValue: value })}
            onSelect={this.handleLocationSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <div className="field">
                  <label className="label">Add your locations</label>
                  <input
                    {...getInputProps({
                      placeholder: 'Search Places ...',
                      className: 'input',
                      type: 'text',
                    })}
                  />
                </div>
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    return (
                      <div {...getSuggestionItemProps(suggestion, {})}>
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </form>
        {!!geolocation &&
          (!geolocation.lat && !geolocation.lng) && (
            <button className="button" onClick={geoLocationRequest}>
              Add current location
            </button>
          )}
      </Fragment>
    );
  }
}

SearchForm.propTypes = {
  addLocationToState: PropTypes.func.isRequired,
  geoLocationRequest: PropTypes.func.isRequired,
  geolocation: PropTypes.object.isRequired,
};

export default SearchForm;
