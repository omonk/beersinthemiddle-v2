import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();
const mockStoreInitialState = {
  recommendations: [],
  map: {},
  locations: [],
  ui: {},
  geoLocation: {},
};
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App store={mockStore(mockStoreInitialState)} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
