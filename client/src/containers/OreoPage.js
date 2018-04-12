import React, { Component } from "react";
import { connect } from "react-redux";
import Typography from "material-ui/Typography";
// import { bindActionCreators } from 'redux';
import axios from "axios";

import Header from "./Header";
import ReviewList from "./oreopage/ReviewList";

import oreoImg from "../oreo.jpg";

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
      <div className="oreo-page">
        <Header page={false} />
        <div className="picture">
          <img src={oreoImg} alt="oreo" />
        </div>
        <div className="info">
          <div>{oreo.name}</div>
          <div>{oreo.description}</div>
          <div>{oreo.tags ? oreo.tags.join(", ") : ""}</div>
        </div>
        <ReviewList />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("OREOPAGE STATE", state);
  return state;
};

export default connect(mapStateToProps)(OreoPage);
