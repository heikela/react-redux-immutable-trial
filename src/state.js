import { createStore } from 'redux';
import { List } from '../immutable-js/dist/immutable';

const initialState = {
  chartItems: List(),
  prevItem: {
    x: 0,
    y: 50
  }
};

const genItem = (prevItem) => ({
  x: prevItem.x + 1,
  y: prevItem.y + Math.random() - 0.5
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
    prevItem: item
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'addItem': return addItems(state, 1);
    case 'addThousand': return addItems(state, 1000);
    default: return state;
  }
};

export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const addPoint = () => {
  store.dispatch({
    type: 'addItem'
  });
};

window.setInterval(addPoint, 10);
