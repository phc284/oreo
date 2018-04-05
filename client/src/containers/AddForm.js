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

class AddForm extends Component {
  renderField = ({ fieldLabel, fieldName, change, error }) => {
    if (fieldName === 'photo') {
      return (
        <TextField
          margin="dense"
          fullWidth
          name={fieldName}
          label={fieldLabel}
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
          onChange={change}
          helperText={error}
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

  //get errors for required fields
  onChange = event => {
    if (!event.target.value.length) {
      this.props.getFormError(event.target.name);
    }
  };

  render() {
    console.log(this.props.error.error);
    return (
      <div>
        <button onClick={this.handleOpen}>Add a cookie</button>
        <Dialog
          open={this.props.AddForm.addForm || false}
          onClose={this.handleClose}
        >
          <DialogTitle id="form-dialog-title">Submit An Oreo</DialogTitle>
          <DialogContent>
            <Field
              name="name"
              component={this.renderField}
              fieldName="name"
              fieldLabel="Name"
              change={this.onChange}
              errMsg={this.props.error.error}
            />
            <Field
              name="description"
              component={this.renderField}
              fieldName="description"
              fieldLabel="Description"
              change={this.onChange}
              errMsg={this.props.error.error}
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
            <Button color="primary">Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ AddForm, error }) => {
  return { AddForm, error };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { openAddform, closeAddform, getFormError },
    dispatch
  );
};

AddForm = connect(mapStateToProps, mapDispatchToProps)(AddForm);

export default reduxForm({ form: 'AddForm' })(AddForm);
