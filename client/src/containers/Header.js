import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import AddForm from './AddForm';

const styles = {
  Typography: {
    fontSize: '40px',
    color: 'white',
    fontWeight: 'bold'
  }
};

const Header = ({ classes }) => {
  console.log(classes);
  return (
    <div className="header">
      <Typography className={classes.Typography} variant="title">
        ratemyoreo
      </Typography>
      <AddForm />
    </div>
  );
};

export default withStyles(styles)(Header);
