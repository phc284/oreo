import React, { Component } from 'react';
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

export default OreoList;
