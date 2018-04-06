import React from 'react';
import { TextField } from 'material-ui';

const AddFormInput = ({
  fieldLabel,
  fieldName,
  input,
  meta: { touched, error },
  ...custom
}) => {
  //create red error color
  let hasError = false;
  if (touched === true && error !== undefined) {
    hasError = true;
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
