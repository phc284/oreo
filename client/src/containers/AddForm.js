import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, TextField } from 'material-ui';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';

import { openAddform, closeAddform } from '../actions';

const renderField = ({ fieldLabel, fieldName }) => (
  <TextField margin="dense" fullWidth name={fieldName} label={fieldLabel} />
);

class AddForm extends Component {
  handleClose = () => {
    this.props.closeAddform();
  };

  handleOpen = () => {
    this.props.openAddform();
  };

  render() {
    return (
      <div>
        <button onClick={this.handleOpen}>Add a cookie</button>
        <Dialog open={this.props.addForm || false} onClose={this.handleClose}>
          <DialogTitle id="form-dialog-title">Submit An Oreo</DialogTitle>
          <DialogContent>
            <Field
              name="inputName"
              component={renderField}
              fieldName="name"
              fieldLabel="Name"
            />
            <Field
              name="inputDescription"
              component={renderField}
              fieldName="description"
              fieldLabel="Description"
            />
            <Field
              name="inputPhoto"
              component={renderField}
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

const mapStateToProps = ({ AddForm }) => {
  console.log(AddForm);
  return AddForm;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openAddform, closeAddform }, dispatch);
};

AddForm = connect(mapStateToProps, mapDispatchToProps)(AddForm);

export default reduxForm({ form: 'AddForm' })(AddForm);
