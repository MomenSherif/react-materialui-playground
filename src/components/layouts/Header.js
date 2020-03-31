import React, { Fragment } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import ExerciseDialog from '../exercises/Dialog';

const Header = ({ muscles, onExerciseCreate }) => {
  return (
    <Fragment>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='subtitle1' color='inherit' style={{ flex: 1 }}>
            Exercise Database
          </Typography>
          <ExerciseDialog muscles={muscles} onCreate={onExerciseCreate} />
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Header;
