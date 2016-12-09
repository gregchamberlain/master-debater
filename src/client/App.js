import React, { Component } from 'react';
import update from 'immutability-helper';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: []
    };
  }

  componentDidMount() {
    this.socket = io.connect('http://192.168.1.19:3001');
    this.socket.on('receive message', data => {
      this.setState(update(this.state, {
        messages: {
          $push: [data.message]
        }
      }));
    });
  }

  update = name => e => {
    this.setState({ [name]: e.target.value });
  }

  send = () => {
    this.socket.emit('new message', { message: this.state.message});
    this.setState({ message: '' });
  }

  render() {
    return (
      <div>
        <h1>Messages</h1>
        <input type="text" onChange={this.update('message')} value={this.state.message} />
        <button onClick={this.send}>Send</button>
        <ul>
          {this.state.messages.map((message, idx) => (
            <li key={idx}>{message}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
