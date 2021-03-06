import React from 'react';
import Card, { CardContent, CardMedia, CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Chip from 'material-ui/Chip';
import { Link } from 'react-router-dom';
import Grow from 'material-ui/transitions/Grow';

import oreoImg from '../oreo.jpg';

const styles = {
  media: {
    height: 200
  },
  ButtonGroup: {
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15
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
  id,
  hydrate,
  checked,
  user
}) => {
  setTimeout(() => {
    checked = false;
  }, 500);
  return (
    <div className="oreo">
      <Grow in={checked}>
        <Card className={classes.card}>
          {/* Check to see if there is a user and if user is an admin*/}
          {user &&
            user.admin && (
              <div className={classes.ButtonGroup}>
                <Button
                  style={styles.deleteButton}
                  onClick={() => {
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
            )}
          <CardMedia
            className={classes.media}
            image={photo ? photo : oreoImg}
            title={name}
          />
          <CardContent>
            <Typography variant="headline">{name}</Typography>
            <Typography component="p" style={{ marginBottom: 10 }}>
              {desc}
            </Typography>
            <Typography variant="subheading" style={{ marginBottom: 10 }}>
              Rating: 8/10
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
            <Link to={{ pathname: `/oreo/${id}` }}>
              <Button size="small" color="primary">
                More Info
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Grow>
    </div>
  );
};

export default withStyles(styles)(Oreo);
