import React, { Component } from 'react';
import GraphComponent from './graph/Graph';
import { SeriesComponent, NaiveSeriesComponent } from './series/SeriesComponent';
import { Provider, connect } from 'react-redux';

import ControlButton from './ControlButton';
import { store } from './store';
import { setupDataStream } from './dataSource/dataSource';

import { addItems } from './series/seriesActions';
import { zoomConnector } from './zooming/ZoomConnector';

const Graph = zoomConnector(GraphComponent);
const SeriesContainer = connect(
  state => ({items: state.getIn(['series', 'chartItems'])})
)(/naive/.test(window.location.href) ? NaiveSeriesComponent : SeriesComponent);
const autoScrollAfter = /scroll/.test(window.location.href) ? 100 : 0

class App extends Component {
  render() {
    const addItemsAction = addItems(1000);
    return (
      <Provider store={store}>
        <div className="App">
          <Graph width={600} height={600} x1={0} y1={0} x2={200} y2={200}
            series={(state => state.get('series'))}
            zooming={(state => state.get('zooming'))}
          >
            <SeriesContainer/>
          </Graph>
          <p>
            <ControlButton action={addItemsAction} >
              Add a thousand points
            </ControlButton>
          </p>
        </div>
      </Provider>
    );
  }
}

setupDataStream(store.dispatch, autoScrollAfter);

export default App;
