import { List, Map } from '../../immutable-js/dist/immutable';

export const getBounds = (state) => {
  const bounds = state.get('bounds');
  return {
    xMin: bounds.minX,
    xMax: bounds.maxX,
    yMin: bounds.minY,
    yMax: bounds.maxY
  };
};

const initialState = Map({
  chartItems: List(),
  prevItem: {
    x: 0,
    y: 100
  },
  bounds: {
    minX: Infinity,
    maxX: -Infinity,
    minY: Infinity,
    maxY: -Infinity
  }
});

const updateBounds = (bounds, newItem) => ({
  minX: bounds.minX < newItem.x ? bounds.minX : newItem.x,
  maxX: bounds.maxX > newItem.x ? bounds.maxX : newItem.x,
  minY: bounds.minY < newItem.y ? bounds.minY : newItem.y,
  maxY: bounds.maxY > newItem.y ? bounds.maxY : newItem.y,
});

const genItem = (prevItem) => ({
  x: prevItem.x + 1,
  y: prevItem.y + Math.random() - 0.5,
  c: 'red'
});

const addItems = (state, count) => {
  var item = state.get('prevItem');
  var items = state.get('chartItems');
  var updatedBounds = state.get('bounds');
  for (var i = 0; i < count; ++i) {
    item = genItem(item);
    items = items.push(item);
    updatedBounds = updateBounds(updatedBounds, item);
  };
  return Map({
    chartItems: items,
    prevItem: item,
    bounds: updatedBounds
  });
};

const recolor = (state) => {
  const items = state.get('chartItems');
  const length = items.size;
  if (length < 10) return state;
  const index = Math.floor(Math.random() * (length - 2)) + 1;
  const item = items.get(index);
  const updatedItem = {...item, c: item.c === 'red' ? 'blue' : 'red'};
  return state.setIn(['chartItems', index], updatedItem);
}

export const series = (state = initialState, action) => {
  switch (action.type) {
    case 'addItems': return addItems(state, action.payload);
    case 'recolor': return recolor(state);
    default: return state;
  }
};
