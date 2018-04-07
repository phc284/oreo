import React from 'react';
import Card, { CardContent, CardMedia, CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import oreoImg from '../oreo.jpg';

const styles = {
  media: {
    height: 200
  },
  card: {
    maxWidth: 200
  }
};

const Oreo = ({ classes, name, desc, photo }) => {
  return (
    <div className="oreo">
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={
            photo ? (photo.includes('jpg', 'png') ? photo : oreoImg) : oreoImg
          }
          title={name}
        />
        <CardContent>
          <Typography variant="headline">{name}</Typography>
          <Typography component="p">{desc}</Typography>
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
