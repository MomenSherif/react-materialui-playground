import React, { Component, Fragment } from 'react';
import { Header, Footer } from './layouts';
import Exercises from './exercises';
import { muscles, exercises } from '../store';
import { Provider } from '../context';

class App extends Component {
  state = {
    exercises,
    exercise: {},
    category: '',
    editMode: false
  };

  getExercisesByMuscles = () => {
    const initialExercises = muscles.reduce(
      (exercise, category) => ({
        ...exercise,
        [category]: []
      }),
      {}
    );

    return Object.entries(
      this.state.exercises.reduce((exercises, exercise) => {
        const { muscles } = exercise;

        exercises[muscles] = exercises[muscles]
          ? [...exercises[muscles], exercise]
          : [exercise];

        return exercises;
      }, initialExercises)
    );
  };

  handleCategorySelect = category => {
    this.setState({ category });
  };

  handleExerciseSelect = id =>
    this.setState(({ exercises }) => ({
      exercise: exercises.find(exercise => exercise.id === id),
      editMode: false
    }));

  handleExerciseCreate = exercise =>
    this.setState(({ exercises }) => ({
      exercises: [...exercises, exercise]
    }));

  handleExerciseDelete = id =>
    this.setState(({ exercises, exercise, editMode }) => ({
      exercises: exercises.filter(exercise => exercise.id !== id),
      editMode: exercise.id === id ? false : editMode,
      exercise: exercise.id === id ? {} : exercise
    }));

  handleExerciseSelectEdit = id =>
    this.setState(({ exercises }) => ({
      exercise: exercises.find(exercise => exercise.id === id),
      editMode: true
    }));

  handleExerciseEdit = exercise => {
    this.setState(({ exercises }) => ({
      exercises: exercises.map(ex => (ex.id !== exercise.id ? ex : exercise)),
      editMode: false,
      exercise
    }));
  };

  getContext = () => ({
    muscles,
    ...this.state,
    exercises: this.getExercisesByMuscles(),
    onCreate: this.handleExerciseCreate,
    onEdit: this.handleExerciseEdit,
    onDelete: this.handleExerciseDelete,
    onSelect: this.handleExerciseSelect,
    onSelectEdit: this.handleExerciseSelectEdit,
    onCategorySelect: this.handleCategorySelect
  });

  render() {
    return (
      <Provider value={this.getContext()}>
        <Fragment>
          <Header />
          <Exercises />
          <Footer />
        </Fragment>
      </Provider>
    );
  }
}

export default App;
