import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog, { DialogContent, DialogActions } from 'material-ui/Dialog';
import Button from 'material-ui/Button';

import { resetFlashMessage } from '../actions';

class FlashMessage extends Component {
  handleClose = () => {
    this.props.resetFlashMessage();
  };

  render() {
    const { id, text } = this.props.messages;
    return (
      <Dialog open={this.props.flashState}>
        <DialogContent>{text}</DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

FlashMessage.propTypes = {};

const mapStateToProps = state => {
  return {
    messages: state.flashMessages.message,
    flashState: state.flashMessages.flashState
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ resetFlashMessage }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessage);
