import React, { Component } from 'react';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { openAddform } from '../actions';
import AddForm from './AddForm';

class Header extends Component {
  handleOpenForm = () => {
    this.props.openAddform();
  };

  render() {
    return (
      <div className="header">
        <span>ratemyoreo</span>
        <AddForm />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openAddform }, dispatch);
};

export default connect(null, mapDispatchToProps)(Header);
