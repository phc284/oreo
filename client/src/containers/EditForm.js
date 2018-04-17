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
    // if not first time edit button pressed (there are prev props)
    if (prevProps.hydrate.oreo) {
      // check if any properties have changed
      for (let key in hydrate.oreo) {
        if (hydrate.oreo[key] !== prevProps.hydrate.oreo[key]) {
          this.props.initialize({
            name: hydrate.oreo.name,
            description: hydrate.oreo.name,
            ...initializeTags(hydrate.oreo.tags)
          });
        }
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

  state = {
    loading: false
  };

  handleClose = () => {
    this.props.closeEditform();
  };

  //go back and connect to server later
  onSubmit = formValues => {
    // start progress circle
    this.setState({
      loading: true
    });
    const id = this.props.hydrate.oreo._id;

    const { name, description, photo, ...tags } = formValues;
    let formData = new FormData();
    if (photo) {
      formData.append('photo', photo.file);
    }
    formData.append('description', description);
    formData.append('name', name);
    formData.append('tags', JSON.stringify(tags));

    const options = {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'multipart/form-data'
      }
    };

    axios.put(`/api/add/${id}`, formData, options).then(() => {
      this.props.addFlashMessage({
        type: 'success',
        text: 'Succsefully Edited'
      });
      this.setState({
        loading: false
      });
      this.handleClose();
      this.props.reset();
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
            loading={this.state.loading}
          />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
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
