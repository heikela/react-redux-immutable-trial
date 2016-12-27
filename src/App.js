import React, { Component } from 'react';
import { Graph } from './Graph';
import { Provider } from 'react-redux';

import { store } from './state';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Graph x1={0} y1={0} x2={200} y2={200} xMin={0} yMin={0} yMax={200} />
        </Provider>
      </div>
    );
  }
}

export default App;
