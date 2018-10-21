import React, { Component, Fragment } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
    };
    this.handleLocationSelect = this.handleLocationSelect.bind(this);
  }

  handleLocationSelect(address, placeId) {
    this.props.addLocationToState(address, placeId);
    this.setState({ inputValue: '' });
  }

  render() {
    const { geolocation, geoLocationRequest } = this.props;

    const { inputValue } = this.state;

    return (
      <Fragment>
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
                <input
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input',
                  })}
                />
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
        {!geolocation.lat &&
          !geolocation.lng && (
            <button onClick={geoLocationRequest}>Get location</button>
          )}
      </Fragment>
    );
  }
}

export default SearchForm;
