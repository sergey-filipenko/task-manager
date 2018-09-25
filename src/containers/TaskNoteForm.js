import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import {connect} from 'react-redux';
import { saveTaskNote } from './../actions';

class TaskNoteForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formData: {}
    }
  };

  onSave = () => {
    this.props.onSaveTaskNote(
      this.props.task.id,
      this.state.formData.note
    );
    this.setState({formData: {}})
  };

  clearForm = () => {
    this.setState({formData: {}})
  };

  render() {
    const schema = {
      type: "object",
      required: ["note"],
      properties: {
        note: {type: "string", title: "Note"},
      }
    };

    if (!this.props.task.id) {
      return null;
    }

    return(
      <Form
        showErrorList={false}
        schema={schema}
        onChange={(formData) => {
          this.setState({formData: formData.formData})
        }}
        formData={this.state.formData}
        onSubmit={this.onSave.bind(this)}>
        <div className="buttons">
          <button type="submit" className="btn btn-submit">Save</button>
          <button onClick={this.clearForm} type="button" className="btn btn-cancel">Cancel</button>
        </div>
      </Form>
    )
  }
}

TaskNoteForm.propTypes = {
  task: PropTypes.object
};

const mapDispatchToProps = dispatch => {
  return {
    onSaveTaskNote: (id, note) => {
      dispatch(saveTaskNote(id, note))
    },
  }
};

export default connect(
  null,
  mapDispatchToProps
)(TaskNoteForm);

