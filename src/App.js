import React, { Component } from 'react';
import GraphComponent from './graph/Graph';
import { Provider } from 'react-redux';

import ControlButton from './ControlButton';
import { store } from './store';

import { connect } from 'react-redux';

import { getBounds } from './series/series';

const Graph = connect(
  state => {
    const {minX, maxX, minY, maxY} = getBounds(state.get('series'));
    return {
      chartItems: state.getIn(['series', 'chartItems']),
      prevItem: state.getIn(['series', 'prevItem']),
      xMin: minX < 0 ? minX : 0,
      xMax: maxX > 10 ? maxX : 10,
      yMin: 0 <= minY ? 0 : minY,
      yMax: 200 >= maxY ? 200 : maxY
    };
  }
)(GraphComponent);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <svg width="600" height="600" viewBox="0 0 200 200">
            <Graph x1={0} y1={0} x2={200} y2={200} />
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
