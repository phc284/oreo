import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import Oreo from '../components/Oreo';
import DeleteModal from '../components/DeleteModal';
import {
  getOreos,
  openEditform,
  closeEditform,
  hydrateForm,
  openDeleteModal,
  closeDeleteModal
} from '../actions';

class OreoList extends Component {
  componentDidMount() {
    this.props.getOreos();
  }

  handleEdit = oreoId => {
    this.props.hydrateForm(oreoId);

    this.props.openEditform();
  };

  handleDelete = id => {
    axios.delete(`/api/delete/${id}`);
    this.props.closeDeleteModal();
    this.props.getOreos();
  };

  render() {
    const { oreos } = this.props.oreos;
    return (
      <div className="oreo-list">
        <DeleteModal
          isOpen={this.props.deleteModal.deleteModal}
          handleClose={this.props.closeDeleteModal}
          id={this.props.deleteModal.id}
          handleDelete={this.handleDelete}
        />
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
                  handleDelete={this.handleDelete}
                  id={oreo._id}
                  openDelete={this.props.openDeleteModal}
                  hydrate={this.props.hydrateForm}
                />
              );
            })
          : null}
      </div>
    );
  }
}

const mapStateToProps = ({ oreos, hydrate, editForm, deleteModal }) => {
  return { oreos, hydrate, editForm, deleteModal };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getOreos,
      openEditform,
      closeEditform,
      hydrateForm,
      openDeleteModal,
      closeDeleteModal
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OreoList);
