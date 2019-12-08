import React, { Fragment } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import PropTypes from 'prop-types';
import { Formik, Form, Field, FieldArray } from 'formik';
import { faMapPin, faPlus } from '@fortawesome/free-solid-svg-icons';
import generate from 'shortid';
import Locations from '../locations';
import Icon from '../common/icon';
import titleImg from '../../assets/title.png';

const renderPlacesAutocomplete = ({ field, form, addLocationToState }) => {
  return (
    <PlacesAutocomplete
      ref={c => {
        if (!c) return;
        console.log({ c });
        c.handleInputOnBlur = () => {};
      }}
      value={field.value}
      onChange={value => form.setFieldValue(field.name, value)}
      onSelect={(address, placeId) => {
        addLocationToState(address, placeId);
        form.setFieldValue(field.name, '');
      }}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <Fragment>
          <div className="field">
            <label className="label">Add each friends location in the box below:</label>
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
                <div key={generate()} className="suggestion" {...getSuggestionItemProps(suggestion, {})}>
                  <Icon icon={faPlus} size="medium" />
                  <span className="label">{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </Fragment>
      )}
    </PlacesAutocomplete>
  );
};

const types = [
  { name: 'bar', label: 'Bar', checkedOnLoad: true },
  { name: 'night club', label: 'Night Club', checkedOnLoad: true },
  { name: 'pub', label: 'Pub', checkedOnLoad: true },
  { name: 'restaurant', label: 'Restaurant', checkedOnLoad: true },
];

const SearchForm = ({
  geolocation,
  isGeoLocating,
  isGeoLocatingError,
  locations,
  geoLocationRequest,
  addLocationToState,
  toggleSearchBox,
  requestLocations,
  searchBoxIsHidden,
  handleRemoval,
  isLoading,
}) => {
  return (
    <Fragment>
      <h1 className="title is-sr-only">
        Beers In The Middle{' '}
        <span role="img" aria-label="beer">
          🍻
        </span>
      </h1>
      <div className="logo-wrapper">
        <img src={titleImg} alt="Beers in the middle logo" />
      </div>
      <h2 className="is-hidden-mobile">Find the most convienient places to hang out with your friends</h2>
      <Formik
        initialValues={{
          inputValue: '',
          types: types.filter(({ checkedOnLoad: i }) => i).map(({ name }) => name),
        }}
        render={({ values }) => {
          return (
            <Form>
              <Field
                name="inputValue"
                render={({ field, form }) => {
                  return renderPlacesAutocomplete({
                    field,
                    form,
                    addLocationToState,
                  });
                }}
              />
              {!geolocation.lat && !geolocation.lng && (
                <button
                  className={`button ${isGeoLocating ? 'is-loading' : ''}`}
                  type="button"
                  onClick={geoLocationRequest}
                >
                  <span>Add current location</span> <Icon icon={faMapPin} size="medium" />
                </button>
              )}
              {isGeoLocatingError && (
                <p className="has-text-danger">
                  Hmm... we seem to have an issue locating you{' '}
                  <span role="img" aria-label="thinking emoji">
                    🤔
                  </span>
                </p>
              )}
              <Locations locations={locations} handleRemoval={handleRemoval} />
              <section className="search__filter">
                <p>Filter your searches</p>
                <FieldArray
                  name="types"
                  render={arrayHelpers => (
                    <>
                      {types.map(({ name, label }) => {
                        return (
                          <div key={label}>
                            <label className="checkbox">
                              <input
                                name="types"
                                value={name}
                                checked={values.types.includes(name)}
                                type="checkbox"
                                onChange={e => {
                                  if (e.target.checked) arrayHelpers.push(name);
                                  else {
                                    const idx = values.types.indexOf(name);
                                    arrayHelpers.remove(idx);
                                  }
                                }}
                              />{' '}
                              {label}
                            </label>
                          </div>
                        );
                      })}
                    </>
                  )}
                />
              </section>
              <button
                type="submit"
                className={`button is-primary ${isLoading ? 'is-loading' : ''}`}
                disabled={locations.length < 2}
              >
                Find the best places to eat/drink
              </button>
            </Form>
          );
        }}
        onSubmit={({ types }) => {
          requestLocations({
            keyword: types,
          });
        }}
      />
      <button
        type="button"
        className="button is-small is-fullwidth is-info search-hide"
        onClick={() => toggleSearchBox()}
      >
        {searchBoxIsHidden ? 'Show form' : 'Hide form'}
      </button>
    </Fragment>
  );
};

SearchForm.propTypes = {
  addLocationToState: PropTypes.func.isRequired,
  geoLocationRequest: PropTypes.func.isRequired,
};

export default SearchForm;
