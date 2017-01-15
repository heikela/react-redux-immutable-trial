import { List, Map } from '../../immutable-js/dist/immutable';
import { RECOLOR, ADD_ITEMS } from './seriesActions';
import cachedUnorderedReduce from '../util/listUtil';

const updateBounds = (bounds, newItem) => ({
  xMin: bounds.xMin < newItem.x ? bounds.xMin : newItem.x,
  xMax: bounds.xMax > newItem.x ? bounds.xMax : newItem.x,
  yMin: bounds.yMin < newItem.y ? bounds.yMin : newItem.y,
  yMax: bounds.yMax > newItem.y ? bounds.yMax : newItem.y,
});

const combineBounds = (bounds, newBounds) =>
  updateBounds(
    updateBounds(bounds, {x: newBounds.xMin, y: newBounds.yMin}),
    {x: newBounds.xMax, y: newBounds.yMax}
  );

const boundsForEmptySet = {
  xMin: Infinity,
  xMax: -Infinity,
  yMin: Infinity,
  yMax: -Infinity
};

const getBoundsFromList = cachedUnorderedReduce(updateBounds, combineBounds, boundsForEmptySet);

export const getBounds = (state) => getBoundsFromList(state.get('chartItems'));

const initialState = Map({
  chartItems: List(),
  prevItem: {
    x: 0,
    y: 100
  }
});

const genItem = (prevItem) => ({
  x: prevItem.x + 1,
  y: prevItem.y + Math.random() - 0.5,
  c: 'red'
});

const addItems = (state, count) => {
  var item = state.get('prevItem');
  var items = state.get('chartItems');
  for (var i = 0; i < count; ++i) {
    item = genItem(item);
    items = items.push(item);
  };
  return Map({
    chartItems: items,
    prevItem: item
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
    case ADD_ITEMS: return addItems(state, action.payload);
    case RECOLOR: return recolor(state);
    default: return state;
  }
};
