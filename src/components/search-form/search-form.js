import React, { Fragment } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import PropTypes from 'prop-types';
import { Formik, Form, Field, FieldArray } from 'formik';
import IconLocate from '../icons/icon-locate';
import Locations from '../locations';
import generate from 'shortid';

const renderPlacesAutocomplete = ({ field, form, addLocationToState }) => {
  return (
    <PlacesAutocomplete
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
                <div
                  className="suggestion"
                  {...getSuggestionItemProps(suggestion, {})}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </Fragment>
      )}
    </PlacesAutocomplete>
  );
};

const Checkbox = ({ field }) => (
  <div>
    <label className="checkbox">
      <input {...field} checked={field.value} type="checkbox" /> {field.name}
    </label>
  </div>
);

const types = [
  { name: 'bar', label: 'Bar' },
  { name: 'club', label: 'Club' },
  { name: 'pub', label: 'Pub' },
  { name: 'restaurant', label: 'Restaurant' },
];

const SearchForm = ({
  geolocation,
  locations,
  geoLocationRequest,
  addLocationToState,
  toggleSearchBox,
  fourSquareRequest,
  searchBoxIsHidden,
  handleRemoval,
  isLoading,
}) => {
  return (
    <Fragment>
      <h1 className="title is-hidden-mobile">
        Beers In The Middle{' '}
        <span role="img" aria-label="beer">
          🍻
        </span>
      </h1>
      <h2 className="is-hidden-mobile">
        Find the most convienient places to hang out with your friends
      </h2>
      <Formik
        initialValues={{
          inputValue: '',
          types: [],
        }}
        onSubmit={({ types }) => {
          fourSquareRequest({
            types,
          });
        }}
        render={({ values }) => {
          return (
            <Form>
              <Field
                name="inputValue"
                render={({ field, form }) =>
                  renderPlacesAutocomplete({
                    field,
                    form,
                    addLocationToState,
                  })
                }
              />
              {!!geolocation && (!geolocation.lat && !geolocation.lng) && (
                <button
                  className="button"
                  type="button"
                  onClick={geoLocationRequest}
                >
                  <span className="is-hidden-mobile">Add current location</span>
                  <IconLocate />
                </button>
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
                              {name}
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
      />
      <button
        className={`button is-small is-fullwidth is-info search-hide`}
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
  geolocation: PropTypes.object.isRequired,
};

export default SearchForm;
