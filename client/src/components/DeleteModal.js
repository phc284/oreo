import React from "react";
import Button from "material-ui/Button";
import Dialog, { DialogTitle, DialogActions } from "material-ui/Dialog";

const DeleteModal = props => {
  return (
    <Dialog open={props.isOpen} onClose={props.handleClose}>
      <DialogTitle>Are You Sure You Want to Delete This Cookie?</DialogTitle>
      <DialogActions>
        <Button color="primary" onClick={props.handleClose}>
          No
        </Button>
        <Button color="secondary" onClick={() => props.handleDelete(props.id)}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
