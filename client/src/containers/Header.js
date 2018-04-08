import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import AddForm from './AddForm';

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

const Header = ({ classes }) => {
  console.log(classes);
  const containerClass = `header ${classes.root}`;
  console.log(containerClass);
  return (
    <div className={containerClass}>
      <AppBar position="static" style={styles.AppBar}>
        <Toolbar>
          <Typography className={classes.Typography} variant="title">
            ratemyoreo
          </Typography>
          <AddForm />
          <Button variant="raised" style={styles.Button}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(Header);
