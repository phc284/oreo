import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { openAddform, closeAddform } from '../actions';

import AddForm from './AddForm';
import EditForm from './EditForm';
import Login from './Login';
import Signup from './Signup';

const styles = {
  Typography: {
    fontSize: '40px',
    color: 'white',
    fontWeight: 'bold'
  },
  Link: {
    flex: 1
  },
  root: {
    flexGrow: 2,
    width: '100%',
    margin: 0
  },
  AppBar: {
    backgroundColor: '#4ccaf4',
    boxShadow: 'none'
  },
  login: {
    backgroundColor: '#526CF4',
    marginLeft: 15
  },
  signup: {
    backgroundColor: '#FFA23E',
    marginLeft: 15
  },
  buttons: {
    alignItems: 'flex-end'
  }
};

class Header extends Component {
  state = {
    loginOpen: false,
    signupOpen: false
  };
  handleOpenAdd = () => {
    this.props.openAddform();
  };

  handleClose = form => {
    const key = `${form}Open`;
    this.setState({
      [key]: false
    });
  };
  handleOpen = form => {
    const key = `${form}Open`;
    this.setState({
      [key]: true
    });
  };

  render() {
    const { classes } = this.props;
    const containerClass = `header ${classes.root}`;
    console.log('geader', this.props);
    return (
      <div className={containerClass}>
        <AppBar position="static" style={styles.AppBar}>
          <Toolbar>
            <Link to="/" className={classes.Link}>
              <Typography variant="title" className={classes.Typography}>
                ratemyoreo
              </Typography>
            </Link>
            {this.props.page ? (
              <div style={styles.buttons}>
                <AddForm />
                <EditForm />
                <Login
                  isOpen={this.state.loginOpen}
                  handleClose={this.handleClose}
                  handleLogin={this.props.handleLogin}
                />
                <Signup
                  isOpen={this.state.signupOpen}
                  handleClose={this.handleClose}
                  handleLogin={this.props.handleLogin}
                />
                <Button variant="raised" onClick={this.handleOpenAdd}>
                  Add a cookie
                </Button>
                <Button
                  variant="raised"
                  style={styles.signup}
                  onClick={() => {
                    this.handleOpen('signup');
                  }}
                >
                  Signup
                </Button>
                <Button
                  variant="raised"
                  style={styles.login}
                  onClick={() => {
                    this.handleOpen('login');
                  }}
                >
                  Login
                </Button>
              </div>
            ) : null}
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
