import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import axios from 'axios';

class OreoPage extends Component {
  state = {
    oreo: {}
  };
  componentDidMount() {
    console.log(this.props);
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
    console.log(oreo);
    return (
      <div className="oreo-page">
        <div>{oreo.name}</div>
        <div>{oreo.description}</div>
        <div>{oreo.tags ? oreo.tags.join(', ') : ''}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('OREOPAGE STATE', state);
  return state;
};

export default connect(mapStateToProps)(OreoPage);
