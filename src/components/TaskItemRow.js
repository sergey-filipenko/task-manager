import React, { Component } from 'react'
import ReactDataGrid from 'react-data-grid';
import PropTypes from 'prop-types';
const { Row } = ReactDataGrid;

class TaskItemRow extends Component {
  render() {
    const row = Object.assign({}, this.props.row, {count: this.props.row['notes'].length});
    const newProps = { ...this.props, row };
    return (
      <div
        className={this.props.selected === this.props.row.id ? 'active' : ''}
        onMouseDown={() => this.props.onRowClick(this.props.row)}
      >
        <Row ref={(node) => { this.row = node; }} {...newProps} />
      </div>
    );
  }
}


TaskItemRow.propTypes = {
  row: PropTypes.object,
  onRowClick: PropTypes.func,
  selected: PropTypes.number
};


export default TaskItemRow;
