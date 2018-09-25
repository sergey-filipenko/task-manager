import React, { Component } from 'react';
import TaskManager from './../containers/TaskManager'
import TaskItemForm from './../containers/TaskItemForm'
import TaskItem from '../containers/TaskItem'

export default class Layout extends Component {
  render() {
    return (
      <div className="App">
        <h1>Task Manager</h1>
        <div className="tasks">
          <TaskItemForm />
          <TaskManager />
        </div>
        <div className="notes">
          <TaskItem />
        </div>
      </div>
    );
  }
}