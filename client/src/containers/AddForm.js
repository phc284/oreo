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

const renderNameField = () => (
  <TextField margin="dense" fullWidth name="name" label="Name" />
);
const renderDescriptionField = () => (
  <TextField
    margin="dense"
    fullWidth
    multiline
    name="description"
    label="Description"
  />
);
const renderPhotoField = () => (
  <TextField margin="dense" fullWidth name="photo" label="Photo Url" />
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
            <Field name="inputSearch" component={renderNameField} type="text" />
            <Field
              name="inputSearch"
              component={renderDescriptionField}
              type="text"
            />
            <Field
              name="inputSearch"
              component={renderPhotoField}
              type="text"
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
