import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog, { DialogTitle } from 'material-ui/Dialog';

import Form from '../components/Form';

import {
  openEditform,
  closeEditform,
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

const initializeTags = tags => {
  return tags.reduce((acc, ele) => {
    return { ...acc, [ele]: true };
  }, {});
};

class EditForm extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { hydrate } = this.props;
    //if not first time edit button pressed (there are prev props)
    if (prevProps.hydrate.oreo) {
      if (prevProps.hydrate.oreo.name !== hydrate.oreo.name) {
        this.props.initialize({
          name: hydrate.oreo.name,
          description: hydrate.oreo.name,
          ...initializeTags(hydrate.oreo.tags)
        });
      }
    } else if (this.props.hydrate.oreo) {
      //else if its first time
      this.props.initialize({
        name: hydrate.oreo.name,
        description: hydrate.oreo.name,
        ...initializeTags(hydrate.oreo.tags)
      });
    }
  }

  handleClose = () => {
    this.props.closeEditform();
    this.props.destroy();
  };

  //go back and connect to server later
  onSubmit = formValues => {
    const id = this.props.hydrate.oreo._id;

    //make a success indicator
    axios.put(`/api/add/${id}`, formValues).then(() => {
      this.props.addFlashMessage({
        type: 'success',
        text: 'Succsefully Edited'
      });
      this.handleClose();
      this.props.getOreos();
    });
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
  // const { oreo } = state.hydrate;
  // if (oreo) {
  //   var initialValues = {
  //     name: oreo.name,
  //     description: oreo.description
  //   };
  // }
  return {
    editForm: state.editForm,
    hydrate: state.hydrate
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { openEditform, closeEditform, getOreos, addFlashMessage },
    dispatch
  );
};

//connect redux
EditForm = reduxForm({
  form: 'OreoEditForm',
  validate,
  shouldError: ({ props }) => {
    return !props.touched;
  }
})(EditForm);

//connect redux-form
export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
