import React, { Component } from 'react';
import Dialog, {
  DialogTitle,
  DialogActions,
  DialogContent
} from 'material-ui/Dialog';
import { Field, reduxForm } from 'redux-form';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddFormInput from '../components/AddFormInput';

//validate input fields
const validate = values => {
  const errors = {};
  const requiredFields = ['username', 'password', 'confirm-password'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (values['confirm-password'] !== values['password']) {
    errors['confirm-password'] = 'Passwords do not match';
  }
  return errors;
};

class Signup extends Component {
  handleSubmit = formValues => {
    console.log('LOGIN FORM VALUES', formValues);
  };

  render() {
    return (
      <Dialog
        open={this.props.isOpen}
        onClose={() => {
          this.props.handleClose('signup');
          this.props.reset();
        }}
      >
        <DialogTitle>SIGNUP</DialogTitle>
        <DialogContent>
          <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
            <Field
              name="username"
              component={AddFormInput}
              type="text"
              fieldName="username"
              fieldLabel="Enter a Username"
            />
            <Field
              name="password"
              component={AddFormInput}
              type="text"
              fieldName="password"
              fieldLabel="Enter A Password"
            />
            <Field
              name="confirm-password"
              component={AddFormInput}
              type="text"
              fieldName="confirm-password"
              fieldLabel="Confirm Password"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={() => {
              this.props.handleClose('signup');
              this.props.reset();
            }}
          >
            Close
          </Button>
          <Button color="primary">Login</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

Signup = reduxForm({
  form: 'SignupForm',
  validate,
  shouldError: ({ props }) => {
    return !props.touched;
  }
})(Signup);

export default connect()(Signup);
