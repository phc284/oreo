import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Oreo from '../components/Oreo';
import { getOreos } from '../actions';

class OreoList extends Component {
  componentDidMount() {
    this.props.getOreos();
  }

  render() {
    const { oreos } = this.props.oreos;
    console.log(oreos);
    return (
      <div className="oreo-list">
        {oreos
          ? oreos.data.map(oreo => {
              return (
                <Oreo
                  key={oreo._id}
                  name={oreo.name}
                  desc={oreo.description}
                  photo={oreo.photo}
                  tags={oreo.tags}
                />
              );
            })
          : null}
      </div>
    );
  }
}

const mapStateToProps = ({ oreos }) => {
  return { oreos };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getOreos }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(OreoList);
