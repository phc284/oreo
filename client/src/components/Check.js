import React from 'react';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

const Check = ({ tag, input, tagsVal }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={tagsVal ? true : false}
          onChange={input.onChange}
          value={tag}
        />
      }
      label={tag}
    />
  );
};

export default Check;
