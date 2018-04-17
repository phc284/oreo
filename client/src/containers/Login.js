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

import { login, addFlashMessage } from '../actions';

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
  state = {
    error: false
  };
  handleSubmit = formValues => {
    console.log('LOGIN FORM VALUES', formValues);
    axios.post('/api/login', formValues).then(data => {
      console.log('data', data);
      if (data.data.error) {
        this.setState({
          error: true
        });

        setTimeout(() => {
          this.setState({
            error: false
          });
        }, 5000);
      } else {
        this.setState({
          error: false
        });
        const user = data.data;
        this.props.login(user);
        this.props.handleClose('login');
        this.props.reset();
      }
    });
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
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <DialogContent>
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
            {this.state.error && (
              <div className="error-text">Incorrect username or password</div>
            )}
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
            <Button>Signup</Button>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ login, addFlashMessage }, dispatch);
};

Login = reduxForm({
  form: 'LoginForm',
  validate,
  shouldError: ({ props }) => {
    return !props.touched;
  }
})(Login);

export default connect(null, mapDispatchToProps)(Login);
