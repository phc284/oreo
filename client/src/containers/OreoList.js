import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import Oreo from '../components/Oreo';
import DeleteModal from '../components/DeleteModal';
import FlashMessage from './FlashMessage';
import {
  getOreos,
  openEditform,
  closeEditform,
  hydrateForm,
  openDeleteModal,
  closeDeleteModal,
  addFlashMessage
} from '../actions';

class OreoList extends Component {
  state = {
    checked: false
  };
  componentDidMount() {
    this.props.getOreos();
    this.setState({
      checked: true
    });
  }

  handleEdit = oreoId => {
    this.props.hydrateForm(oreoId);

    this.props.openEditform();
  };

  handleDelete = id => {
    axios.delete(`/api/delete/${id}`).then(() => {
      this.props.addFlashMessage({
        type: 'success',
        text: 'Succesfully Deleted Item'
      });
      this.props.closeDeleteModal();
      this.props.getOreos();
    });
  };

  render() {
    console.log(this.props);
    const { oreos } = this.props.oreos;
    return (
      <div className="oreo-list">
        <DeleteModal
          isOpen={this.props.deleteModal.deleteModal}
          handleClose={this.props.closeDeleteModal}
          id={this.props.deleteModal.id}
          handleDelete={this.handleDelete}
        />
        <FlashMessage />
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
                  checked={this.state.checked}
                  user={this.props.user}
                />
              );
            })
          : null}
      </div>
    );
  }
}

const mapStateToProps = ({
  oreos,
  hydrate,
  editForm,
  deleteModal,
  flashMessages,
  ...other
}) => {
  console.log('user', other);
  return {
    oreos,
    hydrate,
    editForm,
    deleteModal,
    flashMessages,
    user: other.login.user
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getOreos,
      openEditform,
      closeEditform,
      hydrateForm,
      openDeleteModal,
      closeDeleteModal,
      addFlashMessage
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OreoList);
