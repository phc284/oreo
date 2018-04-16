import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog, { DialogTitle } from 'material-ui/Dialog';

import Form from '../components/Form';

import {
  openAddform,
  closeAddform,
  getOreos,
  addFlashMessage
} from '../actions';

//validate input fields
const validate = values => {
  const errors = {};
  const requiredFields = ['name', 'description'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

class AddForm extends Component {
  state = {
    loading: false
  };
  handleClose = () => {
    this.props.closeAddform();
    this.props.reset();
  };

  handleOpen = () => {
    this.props.openAddform();
  };

  handleOpenAdd = () => {
    this.props.openAddform();
  };

  //go back and connect to server later
  onSubmit = formValues => {
    this.setState({
      loading: true
    });
    const { name, description, photo, ...tags } = formValues;
    let formData = new FormData();

    if (photo) {
      formData.append('photo', photo.file);
    }
    formData.append('description', description);
    formData.append('name', name);
    formData.append('tags', tags);
    const options = {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'multipart/form-data'
      }
    };
    axios.post(`/api/add/`, formData, options).then(() => {
      this.setState({
        loading: false
      });
      this.props.addFlashMessage({
        type: 'success',
        text: 'Successfully Added'
      });
      this.handleClose();
      this.props.getOreos();
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <Dialog open={this.props.addForm || false} onClose={this.handleClose}>
          <DialogTitle id="form-dialog-title">Submit An Oreo</DialogTitle>
          <Form
            handleSubmit={handleSubmit}
            onSubmitHandle={this.onSubmit}
            handleClose={this.handleClose}
            loading={this.state.loading}
          />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    addForm: state.addForm.addForm,
    error: state.error,
    hydrate: state.hydrate
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { openAddform, closeAddform, getOreos, addFlashMessage },
    dispatch
  );
};

//connect redux
AddForm = connect(mapStateToProps, mapDispatchToProps)(AddForm);

//connect redux-form
export default reduxForm({
  form: 'OreoAddForm',
  validate,
  shouldError: ({ props }) => {
    return !props.touched;
  }
})(AddForm);
