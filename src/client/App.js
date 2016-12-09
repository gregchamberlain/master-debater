import React, { Component } from 'react';
import update from 'immutability-helper';

import Room from './chat/Rooms.js';

const App = () => (
  <div style={{display: 'flex'}}>
      <Room />
  </div>
);

export default App;
