import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { TextField } from 'material-ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';

import { getNames, getOreos } from '../actions';

// create material inputfield for searchbar
const renderTextField = inputProps => {
  const { classes, labelText, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: ref,
        classes: {
          input: classes.input
        },
        ...other
      }}
      placeholder={labelText}
      margin="normal"
    />
  );
};

// create suggestions
function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion, query);
  const parts = parse(suggestion, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={part.text._id} style={{ fontWeight: 300 }}>
              {part.text.name}
            </span>
          ) : (
            <strong key={part.text._id} style={{ fontWeight: 500 }}>
              {part.text.name}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    height: 250
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  }
});

class SearchBar extends Component {
  state = {
    value: '',
    id: '',
    suggestions: []
  };

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : this.props.names.filter(suggestion => {
          const keep =
            count < 5 &&
            suggestion.name.toLowerCase().slice(0, inputLength) === inputValue;

          if (keep) {
            count += 1;
          }

          return keep;
        });
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // when click suggestions, go to oreopage
  onSuggestionSelected = (event, ...other) => {
    this.props.history.push(`/oreo/${other[0].suggestion._id}`);
  };

  componentDidMount() {
    this.props.getNames();
  }
  render() {
    const { classes } = this.props;

    return (
      <div className="searchbar">
        <Autosuggest
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion
          }}
          renderInputComponent={renderTextField}
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
          renderSuggestionsContainer={renderSuggestionsContainer}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          onSuggestionSelected={this.onSuggestionSelected}
          inputProps={{
            classes,
            placeholder: 'Search for an Oreo',
            value: this.state.value,
            onChange: this.handleChange
          }}
        />
      </div>
    );
  }
}

/*
      <form onSubmit={handleSubmit(onSubmit)} className="searchbar">
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
*/

const mapStateToProps = ({ names }) => {
  return names;
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getNames, getOreos }, dispatch);
};

SearchBar = withStyles(styles)(SearchBar);

SearchBar = connect(mapStateToProps, mapDispatchToProps)(SearchBar);

export default reduxForm({ form: 'Searchbar' })(SearchBar);
