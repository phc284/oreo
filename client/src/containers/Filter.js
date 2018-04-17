import React, { Component } from 'react';
import Card from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControl, FormControlLabel } from 'material-ui/Form';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'material-ui/Icon';

import { getFilteredOreos, getOreos } from '../actions';

import { tags } from '../helpers/data';

class Filter extends Component {
  state = {
    value: ''
  };
  handleFilter = e => {
    if (e.target.value === 'remove') {
      this.setState({
        value: 'remove'
      });
      this.props.getOreos();
    } else {
      this.setState({
        value: e.target.value
      });
      this.props.getFilteredOreos(e.target.value);
    }
  };

  render() {
    return (
      <div className="filter-container">
        <ExpansionPanel className="filter">
          <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
            <Typography variant="title">Filter</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="filter-details">
            <FormControl component="fieldset" className="filter-layout">
              <RadioGroup
                aria-label=""
                name="tags"
                value={this.state.value}
                onChange={this.handleFilter}
              >
                <FormControlLabel
                  key={-1}
                  value={'remove'}
                  control={<Radio />}
                  label={'Remove Filters'}
                />
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
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getFilteredOreos, getOreos }, dispatch);
};

export default connect(null, mapDispatchToProps)(Filter);
