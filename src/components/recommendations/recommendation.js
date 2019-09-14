import React, { Component } from 'react';
import generate from 'shortid';
// const Recommendation = ({ data, centerMapToRecommendation }) => {
class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  render() {
    const { data, centerMapToRecommendation } = this.props;
    const { lat, lng } = data.location;
    return (
      <div className="recommendation-box">
        <h3 className="title is-5">{data.title}</h3>
        {data.categories && <p>{data.categories.join(', ')}</p>}
        <div
          className={`${
            this.state.isOpen ? '' : 'is-hidden'
          } recommendation-box__main-content`}
        >
          {data.location.address && (
            <address>
              {data.location.address.map((line, index, arr) => {
                return (
                  <p key={generate()} style={{ marginBottom: '0px' }}>
                    {line}
                    {index < arr.length - 1 ? ',' : null}
                  </p>
                );
              })}
            </address>
          )}
        </div>
        <div className="field is-grouped">
          <p className="control">
            <button
              className="button is-primary"
              onClick={() => centerMapToRecommendation({ lat, lng })}
            >
              Show on map
            </button>
          </p>
          <p className="control">
            <button
              className="button is-primary"
              onClick={() => this.setState({ isOpen: !this.state.isOpen })}
            >
              Show details
            </button>
          </p>
        </div>
      </div>
    );
  }
}

export default Recommendation;
