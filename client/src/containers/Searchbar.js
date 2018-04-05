import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, TextField } from 'material-ui';

const renderTextField = ({ labelText }) => (
  <TextField fullWidth name="search" label={labelText} />
);

const SearchBar = () => {
  const labelText = 'Search for your favorite Oreo...';
  return (
    <form className="searchbar">
      <Field
        name="inputSearch"
        labelText={labelText}
        component={renderTextField}
        type="text"
      />
      <Button>
        <i className="material-icons">search</i>
      </Button>
    </form>
  );
};

export default reduxForm({ form: 'Searchbar' })(SearchBar);
