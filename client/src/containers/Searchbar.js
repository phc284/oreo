import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, TextField } from 'material-ui';

const renderTextField = ({ labelText, input }) => (
  <TextField fullWidth name="search" label={labelText} {...input} />
);

const SearchBar = props => {
  const labelText = 'Search for your favorite Oreo...';
  const onSubmit = values => {
    console.log('searchbar', values);
  };
  return (
    <form onSubmit={props.handleSubmit(onSubmit)} className="searchbar">
      <Field
        name="inputSearch"
        labelText={labelText}
        component={renderTextField}
        type="text"
      />
      <Button type="submit">
        <i className="material-icons">search</i>
      </Button>
    </form>
  );
};

export default reduxForm({ form: 'Searchbar' })(SearchBar);
