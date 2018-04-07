import React from 'react';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

const Check = ({ tag, input }) => {
  console.log(tag);
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={input.onChange}
          value={tag}
        />
      }
      label={tag}
    />
  );
};

export default Check;
