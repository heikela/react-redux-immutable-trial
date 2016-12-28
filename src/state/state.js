import { createStore, combineReducers } from 'redux';
import { List } from '../../immutable-js/dist/immutable';
import { timing } from './timing';

const initialState = {
  chartItems: List(),
  prevItem: {
    x: 0,
    y: 100
  },
};

const genItem = (prevItem) => ({
  x: prevItem.x + 1,
  y: prevItem.y + Math.random() - 0.5,
  c: 'red'
});

const addItems = (state, count) => {
  var item = state.prevItem;
  var items = state.chartItems;
  for (var i = 0; i < count; ++i) {
    item = genItem(item);
    items = items.push(item);
  };
  return ({
    chartItems: items,
    prevItem: item,
    timing: state.timing
  });
};

const recolor = (state) => {
  const items = state.chartItems;
  const length = items.size;
  if (length < 10) return state;
  const index = Math.floor(Math.random() * (length - 2)) + 1;
  const item = items.get(index);
  const updatedItem = {...item, c: item.c === 'red' ? 'blue' : 'red'};
  return ({
    chartItems: items.set(index, updatedItem),
    prevItem: state.prevItem,
    timing: state.timing,
  });
}

const chart = (state = initialState, action) => {
  switch (action.type) {
    case 'addItems': return addItems(state, action.payload);
    case 'recolor': return recolor(state);
    default: return state;
  }
};

const reducer = combineReducers({
  timing: timing,
  chart: chart
});

export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

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
