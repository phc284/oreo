import React from 'react';
import Card, { CardContent, CardMedia, CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import oreoImg from '../oreo.jpg';

const styles = {
  media: {
    height: 200
  }
};

const Oreo = props => {
  const { classes } = props;
  return (
    <div className="oreo">
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={oreoImg}
          title="oreo name"
        />
        <CardContent>
          <Typography variant="headline">Oreo Name</Typography>
          <Typography component="p">This oreo is good</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            More Info
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default withStyles(styles)(Oreo);
