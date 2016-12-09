import React, { Component, PropTypes } from 'react'

export default class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  update = e => {
    this.setState({ message: e.target.value });
  }

  submit = e => {
    e.preventDefault();
    this.props.onSend(this.state.message);
    this.setState({ message: '' });
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <input type="text" onChange={this.update} value={this.state.message} />
        <button>Send</button>
      </form>
    );
  }
}
