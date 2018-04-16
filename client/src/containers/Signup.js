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

import { login } from '../actions';

import AddFormInput from '../components/AddFormInput';

//validate input fields
const validate = values => {
  const errors = {};
  const requiredFields = ['username', 'email', 'password', 'confirm-password'];
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

    axios
      .post('/api/signup', formValues)
      .then(data => {
        const user = data.data;
        this.props.login(user);
        this.props.handleClose('signup');
        this.props.reset;
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.isOpen}
          onClose={() => {
            this.props.handleClose('signup');
            this.props.reset();
          }}
        >
          <DialogTitle>SIGNUP</DialogTitle>
          <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
            <DialogContent>
              <Field
                name="username"
                component={AddFormInput}
                type="text"
                fieldName="username"
                fieldLabel="Enter a Username"
              />
              <Field
                name="email"
                component={AddFormInput}
                type="text"
                fieldName="email"
                fieldLabel="Enter an Email"
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
              <Button color="primary" type="submit">
                Signup
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.login.user };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ login }, dispatch);
};

Signup = reduxForm({
  form: 'SignupForm',
  validate,
  shouldError: ({ props }) => {
    return !props.touched;
  }
})(Signup);

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
