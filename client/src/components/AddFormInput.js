import React from 'react';
import { TextField } from 'material-ui';

const AddFormInput = ({
  fieldLabel,
  fieldName,
  input,
  meta: { touched, error },
  errorMsg,
  ...custom
}) => {
  //create red error color
  let hasError = false;
  let multi = false;
  let rows = 1;
  if ((touched && error !== undefined) || errorMsg) {
    hasError = true;
  }
  if (fieldName === 'description') {
    multi = true;
    rows = 2;
  }

  if (fieldName === 'photo') {
    return (
      <TextField
        margin="dense"
        fullWidth
        name={fieldName}
        label={fieldLabel}
        helperText={touched && error}
        {...input}
        error={hasError}
      />
    );
  } else {
    return (
      <TextField
        margin="dense"
        fullWidth
        multiline={multi}
        rows={rows}
        name={fieldName}
        label={fieldLabel}
        helperText={touched && error}
        {...input}
        error={hasError}
      />
    );
  }
};

export default AddFormInput;
