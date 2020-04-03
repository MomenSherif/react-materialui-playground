import React, { Component, Fragment } from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab
} from '@material-ui/core';

import { Add } from '@material-ui/icons';

import Form from './Form';

class ExerciseDialog extends Component {
  state = {
    open: false
  };

  handleToggle = () => {
    this.setState(({ open }) => ({
      open: !open
    }));
  };

  handleFormSubmit = exercise => {
    this.props.onCreate(exercise);
    this.handleToggle();
  };

  render() {
    const { open } = this.state;
    const { muscles } = this.props;

    return (
      <Fragment>
        <Fab
          size='small'
          onClick={this.handleToggle}
          aria-label='create'
          color='secondary'
        >
          <Add />
        </Fab>
        <Dialog
          fullWidth
          maxWidth='sm'
          open={open}
          onClose={this.handleToggle}
          aria-labelledby='Create a new exercise'
        >
          <DialogTitle id='form-dialog-title'>
            Create a New Exercise
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill out the form blow.
            </DialogContentText>
            <Form muscles={muscles} onSubmit={this.handleFormSubmit} />
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

export default ExerciseDialog;
