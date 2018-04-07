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
import { FormGroup } from 'material-ui/Form';

import Check from '../components/Check';

import { openAddform, closeAddform, getFormError } from '../actions';
import AddFormInput from '../components/AddFormInput';
import { tags } from '../helpers/data';

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
  onSubmit = async formValues => {
    console.log('FORMVALUES', formValues);
    await axios.post('/api/add', formValues);
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
                errorMsg={this.props.error.flashError}
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
              <FormGroup row>
                {tags.map((tag, index) => {
                  return (
                    <Field
                      component={Check}
                      name={tag}
                      tag={tag}
                      key={index}
                      value={tag}
                    />
                  );
                })}
              </FormGroup>
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

const mapStateToProps = state => {
  return { addForm: state.addForm, error: state.error };
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
    return !props.touched;
  }
})(AddForm);
