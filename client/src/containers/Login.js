import React, { Component } from 'react';
import Dialog, {
  DialogTitle,
  DialogActions,
  DialogContent
} from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddFormInput from '../components/AddFormInput';

//validate input fields
const validate = values => {
  const errors = {};
  const requiredFields = ['username', 'password'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

class Login extends Component {
  handleSubmit = formValues => {
    console.log('LOGIN FORM VALUES', formValues);
  };

  render() {
    return (
      <Dialog
        open={this.props.isOpen}
        onClose={() => {
          this.props.handleClose('login');
          this.props.reset();
        }}
      >
        <DialogTitle>LOGIN</DialogTitle>
        <DialogContent>
          <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
            <Field
              name="username"
              component={AddFormInput}
              type="text"
              fieldName="username"
              fieldLabel="Username"
            />
            <Field
              name="password"
              component={AddFormInput}
              type="text"
              fieldName="password"
              fieldLabel="Password"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={() => {
              this.props.handleClose('login');
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

Login = reduxForm({
  form: 'LoginForm',
  validate,
  shouldError: ({ props }) => {
    return !props.touched;
  }
})(Login);

export default connect()(Login);
