import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css';
import App from './App';
import { Provider } from 'react-redux'

import registerServiceWorker from './registerServiceWorker';
import {ADD_TASK, ADD_TASK_NOTE, SET_ACTIVE, START_TASK, STOP_TASK, TIMER_TICK} from "./constants";

const loadState = () => {
  return {
    tasks: [],
    item: {},
  }
};

let store = createStore(
  (state, action) => {
    let newState;
    switch (action.type) {
      case ADD_TASK:
        const newTasks = state.tasks.slice(0);
        newTasks.push({
          id: new Date().getTime(),
          name: action.task.name,
          notes: [],
          is_completed: false,
          time: 0,
          is_working: false
        });
        return  Object.assign({}, state, {
          tasks: newTasks
        });
      case ADD_TASK_NOTE:
        newState = Object.assign({}, state);
        newState.tasks = newState.tasks.map((task) => {
          let newTask = Object.assign({}, task);
          if (newTask.id === action.taskId) {
            newTask.notes.push(action.note);
            newState.item = newTask;
          }
          return newTask
        });
        return newState;
      case SET_ACTIVE:
        return  Object.assign({}, state, {
          item: action.item
        });
      case START_TASK:
        newState = Object.assign({}, state);
        newState.tasks = newState.tasks.map((task) => {
          let newTask = Object.assign({}, task);
          if (newTask.id === action.taskId) {
            newTask.is_working = true;
            if (newTask.id === newState.item.id) {
              newState.item = newTask;
            }
          }
          return newTask
        });
        return newState;
      case STOP_TASK:
        newState = Object.assign({}, state);
        newState.tasks = newState.tasks.map((task) => {
          let newTask = Object.assign({}, task);
          if (newTask.id === action.taskId) {
            newTask.is_working = false;
            if (newTask.id === newState.item.id) {
              newState.item = newTask;
            }
          }
          return newTask
        });
        return newState;
      case TIMER_TICK:
        newState = Object.assign({}, state);
        newState.tasks = newState.tasks.map((task) => {
          let newTask = Object.assign({}, task);
          if (newTask.is_working) {
            ++newTask.time;
            if (newTask.id === newState.item.id) {
              newState.item = newTask;
            }
          }
          return newTask
        });
        return newState;
      default:
        return state;
    }

  },
  loadState(),
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
