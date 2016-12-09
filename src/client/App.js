import React, { Component } from 'react';
import update from 'immutability-helper';

import Chat from './chat';

const App = () => (
  <div style={{display: 'flex'}}>
      <Chat room="test1" />
      <Chat room="test2" />
      <Chat room="test3" />
  </div>
);

export default App;
