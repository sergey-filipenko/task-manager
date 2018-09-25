import React, { Component } from 'react';
import Form from 'react-jsonschema-form';
import {connect} from 'react-redux';
import { saveTaskItem } from './../actions';
class TaskItemForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formData: {}
    }
  };

  onSave = () => {
    this.props.onSaveTaskItem({
      name: this.state.formData.task
    });
    this.setState({formData: {}})
  };

  clearForm = () => {
    this.setState({formData: {}})
  };

  render() {
    const schema = {
      type: "object",
      required: ["task"],
      properties: {
        task: {type: "string", title: "Task"},
      }
    };

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

const mapDispatchToProps = dispatch => {
  return {
    onSaveTaskItem: (item) => {
      dispatch(saveTaskItem(item))
    },
  }
};

export default connect(
  null,
  mapDispatchToProps
)(TaskItemForm);

