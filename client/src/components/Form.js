import React from 'react';
import { Button } from 'material-ui';
import { DialogActions, DialogContent } from 'material-ui/Dialog';
import { FormGroup } from 'material-ui/Form';
import { Field } from 'redux-form';

import Check from '../components/Check';

import AddFormInput from '../components/AddFormInput';

import { tags } from '../helpers/data';

const Form = props => {
  return (
    <form onSubmit={props.handleSubmit(props.onSubmitHandle)}>
      <DialogContent>
        <Field
          name="name"
          component={AddFormInput}
          type="text"
          fieldName="name"
          fieldLabel="Name"
        />
        <Field
          name="description"
          type="text"
          component={AddFormInput}
          fieldName="description"
          fieldLabel="Description"
        />
        <div>
          <span>Photo: </span>
          <Field
            name="photo"
            component="input"
            fieldName="photo"
            fieldLabel="Photo"
            type="file"
          />
        </div>
        <FormGroup row>
          {tags.map((tag, index) => {
            return (
              <Field
                component={Check}
                name={tag}
                tag={tag}
                key={index}
                value={tag}
              />
            );
          })}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="secondary">
          Close
        </Button>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </DialogActions>
    </form>
  );
};

export default Form;
