import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Typography from "material-ui/Typography";
// import { bindActionCreators } from 'redux';
import axios from 'axios';

import Header from './Header';
import ReviewList from './oreopage/ReviewList';

import oreoImg from '../oreo.jpg';

class OreoPage extends Component {
  state = {
    oreo: {}
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    axios
      .get(`/api/oreo/${this.props.match.params.id}`)
      .then(({ data: oreo }) => {
        this.setState({
          oreo
        });
      });
  }
  render() {
    const { oreo } = this.state;
    return (
      <div className="page">
        <Header page={false} />
        <div id="oreo-content">
          <div className="picture">
            <img src={oreoImg} alt="oreo" />
          </div>
          <div className="info">
            <div className="oreo-name">Name: {oreo.name}</div>
            <div className="oreo-description">
              Description:
              <p>{oreo.description}</p>
            </div>
            <div className="ratings">
              Ratings:
              <div>Milk Compatability: ⭐⭐⭐</div>
              <div>Sweetness: ⭐⭐⭐</div>
              <div>Overall: ⭐⭐⭐⭐⭐</div>
            </div>
            <div className="oreo-tags">
              Tags: {oreo.tags ? oreo.tags.join(', ') : ''}
            </div>
          </div>
          <ReviewList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(OreoPage);
