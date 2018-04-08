import React, { Component } from 'react';
import Card from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControl, FormControlLabel } from 'material-ui/Form';

import { tags } from '../helpers/data';

class Filter extends Component {
  render() {
    return (
      <Card className="filter">
        <Typography variant="title">Filter</Typography>
        <FormControl component="fieldset">
          <RadioGroup aria-label="" name="gender1">
            {tags.map((tag, i) => (
              <FormControlLabel
                key={i}
                value={tag}
                control={<Radio />}
                label={tag}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Card>
    );
  }
}

export default Filter;
