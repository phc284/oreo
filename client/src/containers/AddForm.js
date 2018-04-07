import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'material-ui';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog';

import { openAddform, closeAddform, getFormError } from '../actions';
import AddFormInput from '../components/AddFormInput';

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

  //go back and connect to server later
  onSubmit = formValues => {
    console.log('submit', formValues);
    axios.post('/api/oreo', formValues).then(data => {
      console.log('hellloo');
    });
    this.props.reset();
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <Button variant="raised" onClick={this.handleOpen}>
          Add a cookie
        </Button>
        <Dialog
          open={this.props.addForm.addForm || false}
          onClose={this.handleClose}
        >
          <DialogTitle id="form-dialog-title">Submit An Oreo</DialogTitle>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <DialogContent>
              <Field
                name="name"
                component={AddFormInput}
                fieldName="name"
                fieldLabel="Name"
              />
              <Field
                name="description"
                component={AddFormInput}
                fieldName="description"
                fieldLabel="Description"
              />
              <Field
                name="photo"
                component={AddFormInput}
                fieldName="photo"
                fieldLabel="Photo"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="secondary">
                Close
              </Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ addForm, error }) => {
  return { addForm, error };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { openAddform, closeAddform, getFormError },
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
    return props.invalid;
  }
})(AddForm);
