import React, { Component } from 'react';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core';

class Form extends Component {
  state = {
    id: 0,
    title: '',
    description: '',
    muscles: ''
  };

  // Replacement for componentWillReciveProps ** Used to make Edit/Add on same form **
  static getDerivedStateFromProps(nextProps, prevState) {
    try {
      if (nextProps.exercise.id !== prevState.id) {
        return {
          id: nextProps.exercise.id,
          title: nextProps.exercise.title,
          description: nextProps.exercise.description,
          muscles: nextProps.exercise.muscles
        }; // this is setState equivalent
      }
    } catch {
      return null;
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    // TODO validate

    this.props.onSubmit({
      ...this.state,
      id: this.state.id === 0 ? Math.random() * 1000 : this.state.id
    });
  };

  render() {
    const { title, description, muscles } = this.state;
    const { muscles: categories } = this.props;

    return (
      <form>
        <TextField
          autoFocus
          fullWidth
          margin='normal'
          id='title'
          name='title'
          label='Title'
          type='text'
          value={title}
          onChange={this.handleChange}
        />
        <FormControl fullWidth margin='normal'>
          <InputLabel id='muscles'>Muscles</InputLabel>
          <Select
            labelId='muscles'
            id='muscles'
            name='muscles'
            value={muscles}
            onChange={this.handleChange}
          >
            {categories.map(category => (
              <MenuItem value={category} key={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          multiline
          rows={4}
          margin='normal'
          id='description'
          name='description'
          label='Description'
          type='text'
          value={description}
          onChange={this.handleChange}
        />
        <Button color='primary' variant='contained' onClick={this.handleSubmit}>
          {this.props.exercise ? 'Edit' : 'Create'}
        </Button>
      </form>
    );
  }
}

export default Form;
