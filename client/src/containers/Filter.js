import React, { Component } from 'react';
import Card from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Radio, { RadioGroup } from 'material-ui/Radio';
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText
} from 'material-ui/Form';

import { tags } from '../helpers/data';

class Filter extends Component {
  render() {
    return (
      <Card className="filter">
        <Typography variant="title">Filter</Typography>
        <FormControl component="fieldset">
          <RadioGroup aria-label="" name="gender1">
            {tags.map(tag => (
              <FormControlLabel value={tag} control={<Radio />} label={tag} />
            ))}
          </RadioGroup>
        </FormControl>
      </Card>
    );
  }
}

export default Filter;
