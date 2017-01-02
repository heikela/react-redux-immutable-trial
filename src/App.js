import React, { Component } from 'react';
import GraphComponent from './graph/Graph';
import { SeriesComponent } from './series/SeriesComponent';
import { Provider, connect } from 'react-redux';

import ControlButton from './ControlButton';
import { store } from './store';

import { zoomConnector } from './zooming/ZoomConnector';

const Graph = zoomConnector(GraphComponent);
const SeriesContainer = connect(state => ({items: state.getIn(['series', 'chartItems'])}))(SeriesComponent);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Graph width="600" height="600" x1={0} y1={0} x2={200} y2={200}
            series={(state => state.get('series'))}
            zooming={(state => state.get('zooming'))}
          >
            <SeriesContainer/>
          </Graph>
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
