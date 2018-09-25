
import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDataGrid from 'react-data-grid';
import TaskItemRow from '../components/TaskItemRow';
import {setItemActive} from "../actions";

class TaskManager extends Component {
  constructor(props) {
    super(props);
    this.header = [
      {
        key: 'name',
        name: 'Task Name',
        sortable: true,
        width: null,
      },
      {
        key: 'time',
        name: "Duration",
        sortable: true,
        width: null,
      },
      {
        key: 'count',
        name: "Comments",
        sortable: true,
        width: null,
      },
    ];
    const rows = this.props.tasks;
    this.state = { rows, selected: null };
  }

  shouldComponentUpdate(newProps) {
    if (JSON.stringify(newProps.tasks) !== JSON.stringify(this.props.tasks)) {
      this.setState({ rows: this.getSortedRows(newProps.tasks) });
      return false;
    }
    return true;
  }

  getSortedRows = (rows) => {
    if (this.tasksGrid.base && this.tasksGrid.base.props && this.tasksGrid.base.props.sortDirection) {
      return this.handleSort(rows, this.tasksGrid.base.props.sortColumn, this.tasksGrid.base.props.sortDirection);
    }
    return rows;
  };

  handleSort = (rows, sortColumn, sortDirection) => {
    const countComparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return a.comments.length > b.comments.length;
      } else if (sortDirection === 'DESC') {
        return b.comments.length > a.comments.length;
      }
      return true;
    };

    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return a[sortColumn].localeCompare(b[sortColumn]);
      } else if (sortDirection === 'DESC') {
        return b[sortColumn].localeCompare(a[sortColumn]);
      }
      return true;
    };
    if (sortColumn === 'count') {
      return rows.sort(countComparer);
    }
    return rows.sort(comparer);
  };

  handleGridSort = (sortColumn, sortDirection) => {
    const rows = sortDirection === 'NONE' ? this.props.tasks : this.handleSort(this.state.rows, sortColumn, sortDirection);
    this.setState({ rows });
  };
  setActive = (row) => {
    this.setState({selected: row.id});
    this.props.setItemActive(row)
  };

  rowGetter = (rowIdx) => {
    return this.state.rows[rowIdx];
  };

  render() {
    return (
      <ReactDataGrid
        ref={(element) => { this.tasksGrid = element; }}
        onGridSort={this.handleGridSort}
        columns={this.header}
        rowGetter={this.rowGetter}
        rowsCount={this.state.rows.length}
        rowRenderer={<TaskItemRow selected={this.state.selected} onRowClick={this.setActive} />}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks || null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setItemActive: (item) => {
      dispatch(setItemActive(item))
    },

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskManager);

