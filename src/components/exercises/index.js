import React, { Fragment } from 'react';
import {
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  Typography,
  makeStyles,
  Container
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import Form from './Form';

const useStyles = makeStyles({
  paper: {
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    height: 500,
    overflowY: 'auto'
  }
});

const Exercises = ({
  exercises,
  category,
  editMode,
  muscles,
  onSelect,
  onDelete,
  onSelectEdit,
  onEdit,
  exercise,
  exercise: {
    id,
    title = 'Welcome!',
    description = 'Please select an exercise from the list on the left'
  }
}) => {
  const classes = useStyles();
  const exercisesList = exercises
    .filter(([group]) => group.match(category))
    .map(([group, exercises], i) => (
      <Fragment key={group}>
        <Typography variant='subtitle1' style={{ textTransform: 'capitalize' }}>
          {group}
        </Typography>
        <List component='ul' aria-label='Exercises List'>
          {exercises.map(({ id, title }) => (
            <ListItem button key={id} onClick={() => onSelect(id)}>
              <ListItemText primary={title} />
              <ListItemSecondaryAction>
                <IconButton
                  edge='end'
                  aria-label='edit'
                  onClick={() => onSelectEdit(id)}
                >
                  <Edit />
                </IconButton>

                <IconButton
                  edge='end'
                  aria-label='delete'
                  onClick={() => onDelete(id)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Fragment>
    ));

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2}>
        <Grid item sm>
          <Paper className={classes.paper}>{exercisesList}</Paper>
        </Grid>
        <Grid item sm>
          {editMode ? (
            <Form muscles={muscles} exercise={exercise} onSubmit={onEdit} />
          ) : (
            <Paper className={classes.paper}>
              <Typography variant='h2'>{title}</Typography>
              <Typography variant='body1' style={{ marginTop: 20 }}>
                {description}
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Exercises;
