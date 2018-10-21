import React from 'react';
import './App.css';
import SearchFormContainer from './components/search-form/search-form-container';
import Locations from './components/locations';
const App = props => {
  return (
    <div className="App">
      <SearchFormContainer />
      <Locations />
    </div>
  );
};

export default App;
