import React from 'react';
import Card, { CardContent, CardMedia, CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Chip from 'material-ui/Chip';

import oreoImg from '../oreo.jpg';

const styles = {
  media: {
    height: 200
  },
  ButtonGroup: {
    textAlign: 'center',
    paddingTop: 15
  },
  deleteButton: {
    color: 'red'
  },
  editButton: {
    color: 'green'
  }
};

//remove ternary for tags once all cards have tags

const Oreo = ({
  classes,
  name,
  desc,
  photo,
  tags,
  handleEdit,
  openDelete,
  id
}) => {
  return (
    <div className="oreo">
      <Card className={classes.card}>
        <div className={classes.ButtonGroup}>
          <Button
            style={styles.deleteButton}
            onClick={() => {
              console.log(id);
              openDelete(id);
            }}
          >
            <i className="material-icons">delete</i>
          </Button>
          <Button
            style={styles.editButton}
            onClick={() => {
              handleEdit(id);
            }}
          >
            <i className="material-icons">edit</i>
          </Button>
        </div>
        <CardMedia
          className={classes.media}
          image={
            photo ? (photo.includes('jpg', 'png') ? photo : oreoImg) : oreoImg
          }
          title={name}
        />
        <CardContent>
          <Typography variant="headline">{name}</Typography>
          <Typography component="p" style={{ marginBottom: 10 }}>
            {desc}
          </Typography>
          {tags
            ? tags.map((tag, i) => (
                <Chip
                  key={i}
                  label={tag}
                  style={{ fontSize: 10, fontWeight: 'bold', margin: 3 }}
                />
              ))
            : null}
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
