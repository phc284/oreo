import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog, { DialogTitle } from 'material-ui/Dialog';

import Form from '../components/Form';

import { openEditform, closeEditform } from '../actions';

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

class EditForm extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log('DIDUPDATE');
  }
  handleClose = () => {
    this.props.closeEditform();
    this.props.reset();
  };

  handleOpen = () => {
    this.props.openEditform();
  };

  //go back and connect to server later
  onSubmit = async formValues => {
    await axios.post(`/api/add/${''}`, formValues);
    this.handleClose();
    this.props.getOreos();
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.editForm.editForm || false}
          onClose={this.handleClose}
        >
          <DialogTitle id="form-dialog-title">Submit An Oreo</DialogTitle>
          <Form handleSubmit={handleSubmit} onSubmitHandle={this.onSubmit} />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { oreo } = state.hydrate;
  let initial = {
    name: 'adfads',
    description: 'sdfsdf'
  };
  console.log(initial);
  return {
    editForm: state.editForm,
    hydrate: state.hydrate,
    initialValues: initial
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openEditform, closeEditform }, dispatch);
};

//connect redux
EditForm = connect(mapStateToProps, mapDispatchToProps)(EditForm);

//connect redux-form
export default reduxForm({
  form: 'OreoEditForm',
  validate,
  shouldError: ({ props }) => {
    return !props.touched;
  }
})(EditForm);
