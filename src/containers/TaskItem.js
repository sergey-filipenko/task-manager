
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import TaskNoteForm from './TaskNoteForm'
import {startTask, stopTask} from "../actions";

class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.header = [
      {
        key: 'note',
        name: 'Note',
        sortable: true,
        width: null,
      },
    ];
    const rows = this.props.item.notes ? this.props.item.notes : [];
    this.state = { rows };
  }

  startTask = () => {
    this.props.onStartTask(this.props.item.id);
  };

  stopTask = () => {
    this.props.onStopTask(this.props.item.id);
  };

  render() {
    let notes = null;
    let buttons = null;
    if (this.props.item.notes && this.props.item.notes.length) {
      notes = (this.props.item.notes.map((note, index) => {
        return (
          <div className="note" key={index}>{note}</div>
        )}));
    }
    if (this.props.item.id) {
      buttons = (
        <div className="task-buttons clearfix">
          <button type="button" onClick={this.startTask} disabled={this.props.item.is_working} className="btn btn-start">Start</button>
          <button type="button" onClick={this.stopTask} disabled={!this.props.item.is_working} className="btn btn-stop">Stop</button>
        </div>
      );
    }
    return (
      <div>
        <h3>{this.props.item.name}</h3>
        {buttons}
        <div className="clearfix">
          <TaskNoteForm task={this.props.item}/>
        </div>
        {notes}
      </div>
    );
  }
}

TaskItem.propTypes = {
  task: PropTypes.object
};

const mapStateToProps = state => {
  return {
    item: state.item || null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onStartTask: (id) => {
      dispatch(startTask(id))
    },
    onStopTask: (id) => {
      dispatch(stopTask(id))
    },

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskItem);

