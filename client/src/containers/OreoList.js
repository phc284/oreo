import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Oreo from '../components/Oreo';
import { getOreos, openEditform, closeEditform, hydrateForm } from '../actions';

class OreoList extends Component {
  componentDidMount() {
    this.props.getOreos();
  }

  handleEdit = oreoId => {
    console.log('HANDLE EDIT ID', oreoId);
    this.props.hydrateForm(oreoId);

    this.props.openEditform();
  };

  render() {
    const { oreos } = this.props.oreos;
    return (
      <div className="oreo-list">
        {oreos
          ? oreos.map(oreo => {
              return (
                <Oreo
                  key={oreo._id}
                  name={oreo.name}
                  desc={oreo.description}
                  photo={oreo.photo}
                  tags={oreo.tags}
                  handleEdit={this.handleEdit}
                  id={oreo._id}
                />
              );
            })
          : null}
      </div>
    );
  }
}

const mapStateToProps = ({ oreos, hydrate, editForm }) => {
  return { oreos, hydrate, editForm };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { getOreos, openEditform, closeEditform, hydrateForm },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OreoList);
