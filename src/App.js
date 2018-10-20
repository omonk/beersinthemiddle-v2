import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import geoLocationRequest from './redux/actions/geo-location';

class App extends Component {
  constructor(props) {
    super(props);

    this.props = this.props;
  }

  componentWillMount() {
    if ('geolocation' in navigator) {
      this.props.geoLocationRequest();
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

const mapStateToProps = ({ geolocation }) => {
  return {
    geolocation: geolocation,
  };
};
const mapDispatchToProps = (dispatch, state) => {
  return {
    geoLocationRequest: () => dispatch(geoLocationRequest),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
