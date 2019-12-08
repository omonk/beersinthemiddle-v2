import React from 'react';
import { connect } from 'react-redux';
import { toggleSavedSearches } from '../../redux/actions/ui';

function SavedSearches(props) {
  const { toggleSavedSearches } = props;
  return (
    <div>
      <h1>Saved Searches</h1>
      <p onClick={() => toggleSavedSearches()}>toggle</p>
    </div>
  );
}

const mapStateToProps = state => {
  const { ui } = state;

  return {
    searchBoxIsHidden: ui.searchBoxIsHidden,
  };
};

const mapDispatchToProps = (dispatch, state) => {
  return {
    toggleSavedSearches: () => dispatch(toggleSavedSearches()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedSearches);
