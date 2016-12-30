import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { timing } from './state/timing';
import { series } from './series/series';
import { Map } from 'immutable';

const reducer = combineReducers({
  timing: timing,
  series: series
});

export const store = createStore(reducer, Map(), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

/*
const addPoints = (count) => function dispatchAddPoints() {
  store.dispatch({
    type: 'addItems',
    payload: count
  });
}

const dispatchSmoothen = () => {
  store.dispatch({
    type: 'recolor'
  });
};
*/
const addAndSmoothen = (count) => function dispatchAddAndSmoothen() {
  store.dispatch({
    type: 'addItems',
    payload: count
  });
  store.dispatch({
    type: 'recolor'
  });
}

/*
const dispatchLogPerformance = () => {
  store.dispatch({
    type: 'logPerformance'
  });
}
*/
//window.setInterval(addPoints(50), 10);
window.setInterval(addAndSmoothen(10), 10);
//window.setInterval(dispatchLogPerformance, 5000);
