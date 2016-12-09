import React, { Component, PropTypes } from 'react';
import update from 'immutability-helper';

import Chat from './index';

export default class Room extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      name: ''
    };
  }

  updateName = e => {
    this.setState({ name: e.target.value });
  }

  addRoom = e => {
    e.preventDefault();
    if (!this.state.name) return;
    this.setState(update(this.state, {
      rooms: { $push: [this.state.name] },
      name: { $set: '' }
    }));
  }

  removeRoom = idx => e => {
    this.setState(update(this.state, {
      rooms: { $splice: [[idx, 1]] }
    }));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.addRoom}>
          <input type="text" value={this.state.name} onChange={this.updateName} />
          <button>Add Room</button>
        </form>
        <div style={{display: 'flex'}}>
          {this.state.rooms.map((room, idx) => (
            <div key={idx}>
              <Chat room={room} />
              <button onClick={this.removeRoom(idx)}>Remove Room</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
