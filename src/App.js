import React, { Component } from 'react';
import { Graph } from './Graph';
import { Provider } from 'react-redux';

import ControlButton from './ControlButton';
import { store } from './state';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <svg width="600" height="600" viewBox="0 0 200 200">
            <Graph x1={0} y1={0} x2={200} y2={200} xMin={0} yMin={0} yMax={200} />
          </svg>
          <p>
            <ControlButton action={{type:'addItems', payload:1000}} >
              Add a thousand points
            </ControlButton>
          </p>
        </div>
      </Provider>
    );
  }
}

export default App;
