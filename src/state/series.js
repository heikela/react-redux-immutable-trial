import { List } from '../../immutable-js/dist/immutable';

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

export const series = (state = initialState, action) => {
  switch (action.type) {
    case 'addItems': return addItems(state, action.payload);
    case 'recolor': return recolor(state);
    default: return state;
  }
};
