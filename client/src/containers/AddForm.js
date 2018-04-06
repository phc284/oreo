import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, TextField } from 'material-ui';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog';

import { openAddform, closeAddform, getFormError } from '../actions';

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
  renderField = ({
    fieldLabel,
    fieldName,
    input,
    meta: { touched, error },
    ...custom
  }) => {
    if (fieldName === 'photo') {
      return (
        <TextField
          margin="dense"
          fullWidth
          name={fieldName}
          label={fieldLabel}
          helperText={touched && error}
          {...input}
        />
      );
    } else {
      return (
        <TextField
          margin="dense"
          required
          fullWidth
          name={fieldName}
          label={fieldLabel}
          helperText={touched && error}
          {...input}
        />
      );
    }
  };
  handleClose = () => {
    this.props.closeAddform();
  };

  handleOpen = () => {
    this.props.openAddform();
  };

  onSubmit = formValues => {
    console.log('submit', formValues);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <button onClick={this.handleOpen}>Add a cookie</button>
        <Dialog
          open={this.props.addForm.addForm || false}
          onClose={this.handleClose}
        >
          <DialogTitle id="form-dialog-title">Submit An Oreo</DialogTitle>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <DialogContent>
              <Field
                name="name"
                component={this.renderField}
                fieldName="name"
                fieldLabel="Name"
              />
              <Field
                name="description"
                component={this.renderField}
                fieldName="description"
                fieldLabel="Description"
              />
              <Field
                name="photo"
                component={this.renderField}
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

AddForm = connect(mapStateToProps, mapDispatchToProps)(AddForm);

export default reduxForm({
  form: 'OreoAddForm',
  validate
})(AddForm);
