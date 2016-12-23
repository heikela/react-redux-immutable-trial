import React, { Component } from 'react';
import { Graph } from './Graph';
import { Provider } from 'react-redux';

import { store } from './state';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Graph />
        </Provider>
      </div>
    );
  }
}

export default App;
