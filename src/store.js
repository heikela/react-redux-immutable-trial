import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { timing } from './timing/timing';
import { series } from './series/series';
import { zooming } from './zooming/zooming';
import { Map } from '../immutable-js/dist/immutable';

const reducer = combineReducers({
  timing: timing,
  series: series,
  zooming: zooming
});

export const store = createStore(reducer, Map(), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
