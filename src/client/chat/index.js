import React, { Component } from 'react';
import update from 'immutability-helper';

import socket from '../utils/socket';
import MessageList from './MessageList';
import MessageForm from './Form';

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.socket = socket();
  }

  componentDidMount() {
    this.socket.emit('join room', this.props.room);
    this.socket.on(`receive message`, message => {
      this.setState(update(this.state, {
        messages: { $push: [message] }
      }));
    });
  }

  componentWillUnmount() {
    this.socket.emit('leave room', this.props.room);
  }

  send = text => {
    this.socket.emit('send message', { text }, this.props.room);
  }

  render() {
    return (
      <div>
        <h1>Room {this.props.room}</h1>
        <MessageForm onSend={this.send} />
        <MessageList messages={this.state.messages} />
      </div>
    );
  }
}

export default Chat;
