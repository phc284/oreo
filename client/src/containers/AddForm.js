import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog, { DialogTitle } from 'material-ui/Dialog';

import Form from '../components/Form';

import { openAddform, closeAddform, getOreos } from '../actions';

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
          open={this.props.addForm.addForm || false}
          onClose={this.handleClose}
        >
          <DialogTitle id="form-dialog-title">Submit An Oreo</DialogTitle>
          <Form
            handleSubmit={handleSubmit}
            onSubmitHandle={this.onSubmit}
            handleClose={this.handleClose}
          />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { addForm: state.addForm, error: state.error, hydrate: state.hydrate };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openAddform, closeAddform, getOreos }, dispatch);
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
