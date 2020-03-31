import React, { Component, Fragment } from 'react';
import { Header, Footer } from './layouts';
import Exercises from './exercises';
import { muscles, exercises } from '../store';

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
    this.setState(({ exercises }) => ({
      exercises: exercises.filter(exercise => exercise.id !== id),
      editMode: false,
      exercise: {}
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
  render() {
    const exercises = this.getExercisesByMuscles();
    const { category, exercise, editMode } = this.state;

    return (
      <Fragment>
        <Header
          onExerciseCreate={this.handleExerciseCreate}
          muscles={muscles}
        />
        <Exercises
          exercise={exercise}
          exercises={exercises}
          category={category}
          editMode={editMode}
          muscles={muscles}
          onSelect={this.handleExerciseSelect}
          onDelete={this.handleExerciseDelete}
          onSelectEdit={this.handleExerciseSelectEdit}
          onEdit={this.handleExerciseEdit}
        />
        <Footer
          muscles={muscles}
          category={category}
          onSelect={this.handleCategorySelect}
        />
      </Fragment>
    );
  }
}

export default App;
