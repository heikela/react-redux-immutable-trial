export const ADD_ITEMS = 'series/addItems';
export const RECOLOR = 'series/recolor';

export const addItems = (count) => ({
  type: ADD_ITEMS,
  payload: count
});

export const recolor = () => ({
  type: RECOLOR
});
