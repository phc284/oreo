import React, { Component } from 'react';
import { connect } from 'react-redux';

import Oreo from '../components/Oreo';

class OreoList extends Component {
  render() {
    return (
      <div className="oreo-list">
        <Oreo />
        <Oreo />
        <Oreo />
        <Oreo />
        <Oreo />
        <Oreo />
        <Oreo />
        <Oreo />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(OreoList);
