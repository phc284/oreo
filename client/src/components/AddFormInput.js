import React from 'react';
import { TextField } from 'material-ui';

const AddFormInput = ({
  fieldLabel,
  fieldName,
  input,
  meta: { touched, error },
  change,
  errorMsg,
  ...custom
}) => {
  //create red error color
  let hasError = false;
  let multi = false;
  if ((touched && error !== undefined) || errorMsg) {
    hasError = true;
  }

  //set rows for input
  let rows = 1;
  if (fieldName === 'description') {
    multi = true;
    rows = 2;
  }

  //set name and desc values based on fieldName
  // let defaultValue = custom[`${fieldName}Val`];

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
};

export default AddFormInput;
