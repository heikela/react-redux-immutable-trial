import { createStore } from 'redux';
import { List } from '../immutable-js/dist/immutable';

const initialState = {
  chartItems: List(),
  prevItem: {
    x: 0,
    y: 50
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'addItem':
      const newItem = {
        x: state.prevItem.x + 1,
        y: state.prevItem.y + Math.random() - 0.5
      };
      return ({
        chartItems: state.chartItems.push(newItem),
        prevItem: newItem
      });
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
