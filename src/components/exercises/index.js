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
import { withContext } from '../../context';

const useStyles = makeStyles({
  paper: {
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    height: '500px',
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
        <Typography
          variant='subtitle1'
          color='primary'
          style={{ textTransform: 'capitalize' }}
        >
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
                  color='primary'
                  onClick={() => onSelectEdit(id)}
                >
                  <Edit />
                </IconButton>

                <IconButton
                  edge='end'
                  aria-label='delete'
                  color='primary'
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
    <Container maxWidth='lg'>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>{exercisesList}</Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            {editMode ? (
              <Form
                key={id}
                muscles={muscles}
                exercise={exercise}
                onSubmit={onEdit}
              />
            ) : (
              <Fragment>
                <Typography variant='h2' color='primary' gutterBottom>
                  {title}
                </Typography>
                <Typography variant='body1'>{description}</Typography>
              </Fragment>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withContext(Exercises);
