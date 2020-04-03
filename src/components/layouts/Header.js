import React, { Fragment } from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import ExerciseDialog from '../exercises/Dialog';

const useStyles = makeStyles({
  flex: {
    flex: 1
  }
});

const Header = ({ muscles, onExerciseCreate }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='subtitle1'
            color='inherit'
            className={classes.flex}
          >
            Exercise Database
          </Typography>
          <ExerciseDialog muscles={muscles} onCreate={onExerciseCreate} />
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Header;
