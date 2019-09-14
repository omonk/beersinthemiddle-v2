import React, { Component, Fragment } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import IconLocate from '../icons/icon-locate';
import generate from 'shortid';

const renderPlacesAutocomplete = ({ field, form, addLocationToState }) => {
  return (
    <>
      {/* <PlacesAutocomplete
        value={field.value}
        onChange={search => {
          form.setFieldValue(field.name, search);
        }}
      >
        {({ getInputProps, getSuggestionItemProps, suggestions }) => {
          const additionalProps = {
            name: field.name,
          };

          const autocompleteInputProps = getInputProps(additionalProps);

          return (
            <div className="autocomplete-root">
              <input {...autocompleteInputProps} />
              <div className="autocomplete-dropdown-container">
                {suggestions.map(suggestion => (
                  <div {...getSuggestionItemProps(suggestion)}>
                    <span>{suggestion.description}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      </PlacesAutocomplete> */}
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
    </>
  );
};

const Checkbox = ({ field }) => (
  <div>
    <label class="checkbox">
      <input {...field} checked={field.value} type="checkbox" /> {field.name}
    </label>
  </div>
);

const SearchForm = ({
  geolocation,
  geoLocationRequest,
  addLocationToState,
}) => {
  return (
    <Fragment>
      <h1 className="title is-hidden-mobile">
        Beers In The Middle.
        <span role="img" aria-label="beer">
          🍻
        </span>
      </h1>
      <p className="is-hidden-mobile">
        Find the most convienient places to hang out with your friends
      </p>
      <Formik
        initialValues={{
          inputValue: '',
          bar: false,
          restaurant: true,
        }}
        onSubmit={values => geoLocationRequest(values)}
        render={() => {
          return (
            <Form>
              <Field
                name="location"
                render={({ field, form }) =>
                  renderPlacesAutocomplete({
                    field,
                    form,
                    addLocationToState,
                  })
                }
              />
              {!!geolocation && (!geolocation.lat && !geolocation.lng) && (
                <button className="button" onClick={geoLocationRequest}>
                  <span className="is-hidden-mobile">Add current location</span>
                  <IconLocate />
                </button>
              )}
              <section className="search__filter">
                <p>Filter your searches</p>
                <Field key={generate()} name={'bar'} component={Checkbox} />
                <Field
                  key={generate()}
                  name={'restaurant'}
                  component={Checkbox}
                />
              </section>
            </Form>
          );
        }}
      ></Formik>
    </Fragment>
  );
};

SearchForm.propTypes = {
  addLocationToState: PropTypes.func.isRequired,
  geoLocationRequest: PropTypes.func.isRequired,
  geolocation: PropTypes.object.isRequired,
};

export default SearchForm;
