import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { openAddform, closeAddform } from '../actions';

import AddForm from './AddForm';
import EditForm from './EditForm';

const styles = {
  Typography: {
    fontSize: '40px',
    color: 'white',
    fontWeight: 'bold',
    flex: 1
  },
  root: {
    flexGrow: 1,
    width: '100%',
    margin: 0
  },
  AppBar: {
    backgroundColor: '#4ccaf4',
    boxShadow: 'none'
  },
  Button: {
    backgroundColor: 'green',
    marginLeft: 15
  }
};

class Header extends Component {
  handleOpenAdd = () => {
    this.props.openAddform();
  };
  render() {
    const { classes } = this.props;
    const containerClass = `header ${classes.root}`;
    return (
      <div className={containerClass}>
        <AppBar position="static" style={styles.AppBar}>
          <Toolbar>
            <Typography className={classes.Typography} variant="title">
              ratemyoreo
            </Typography>
            <AddForm />
            <EditForm />
            <Button variant="raised" onClick={this.handleOpenAdd}>
              Add a cookie
            </Button>
            <Button variant="raised" style={styles.Button}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { addForm: state.addForm, hydrate: state.hydrate };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openAddform, closeAddform }, dispatch);
};

//connect redux
Header = connect(mapStateToProps, mapDispatchToProps)(Header);

export default withStyles(styles)(Header);
