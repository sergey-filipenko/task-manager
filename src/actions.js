import { ADD_TASK, ADD_TASK_NOTE, SET_ACTIVE, START_TASK, STOP_TASK, TIMER_START, TIMER_TICK, TIMER_STOP } from "./constants";

let timer = null;

export const saveTaskItem = (task) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TASK,
      task
    })
  }
};

export const start = () => (dispatch) => {
  clearInterval(timer);
  timer = setInterval(() => dispatch(tick()), 1000);
  dispatch({ type: TIMER_START });
  dispatch(tick())
};

export const tick = () => {
  return { type: TIMER_TICK };
};

const stop = () => {
  clearInterval(timer);
  return { type: TIMER_STOP };
};

export const startTask = (taskId) => {
  return (dispatch) => {
    dispatch({ type: START_TASK, taskId});
    dispatch(start());
  }
};

export const stopTask = (taskId) => {
  return (dispatch, getState) => {
    dispatch({ type: STOP_TASK, taskId});
    let activeTasks = getState().tasks.filter((item, id) => {
      return item.is_working
    });
    if (!activeTasks.length) {
      dispatch(stop())
    }
  }
};

export const saveTaskNote = (taskId, note) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TASK_NOTE,
      taskId,
      note
    })
  }
};

export const setItemActive = (item) => {
  return (dispatch) => {
    dispatch({
      type: SET_ACTIVE,
      item
    })
  }
};
