import React from 'react';
import { connect } from 'react-redux';
import { toggleSavedSearches } from '../../redux/actions/ui';
import moment from 'moment';
import styled from '@emotion/styled';

const SavedSearch = styled.div`
  /* padding: 1rem 0 0; */
`;

const Location = styled.div`
  text-overflow: ellipsis;
  padding-bottom: 12px;
`;

const SearchTitle = styled.p`
  margin-bottom: 12px;
`;

const Button = styled.button`
  margin-top: 12px;
`;

function SavedSearches(props) {
  const { toggleSavedSearches, savedSearches = [] } = props;

  return (
    <div>
      <h1 className="title is-4">Saved Searches</h1>

      {savedSearches.length > 0 ? (
        savedSearches.map(({ date, locations }) => {
          return (
            <SavedSearch key={date}>
              <SearchTitle>{moment(date).format('Do MMMM')}</SearchTitle>
              {locations.map(({ address, placeId }) => {
                return (
                  <Location key={placeId}>
                    <p>- {address}</p>
                  </Location>
                );
              })}
              <Button type="button" className="button is-fullwidth is-danger" onClick={() => {}}>
                Load
              </Button>
              <hr />
            </SavedSearch>
          );
        })
      ) : (
        <p>No previous searches</p>
      )}

      <button type="button" className="button is-fullwidth is-info search-hide" onClick={() => toggleSavedSearches()}>
        Hide previous searches
      </button>
    </div>
  );
}

const mapStateToProps = state => {
  const { ui, savedSearches } = state;

  return {
    searchBoxIsHidden: ui.searchBoxIsHidden,
    savedSearches,
  };
};

const mapDispatchToProps = (dispatch, state) => {
  return {
    toggleSavedSearches: () => dispatch(toggleSavedSearches()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SavedSearches);
