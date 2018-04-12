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
  Button: {
    backgroundColor: 'green',
    marginLeft: 15
  },
  buttons: {
    alignItems: 'flex-end'
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
            <Link to="/" className={classes.Link}>
              <Typography variant="title" className={classes.Typography}>
                ratemyoreo
              </Typography>
            </Link>
            {this.props.page ? (
              <div style={styles.buttons}>
                <AddForm />
                <EditForm />
                <Button variant="raised" onClick={this.handleOpenAdd}>
                  Add a cookie
                </Button>
                <Button variant="raised" style={styles.Button}>
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
