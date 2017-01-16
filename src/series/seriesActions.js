export const ADD_ITEMS = 'series/ADD_ITEMS';
export const RECOLOR = 'series/RECOLOR';

export const addItems = (count) => ({
  type: ADD_ITEMS,
  payload: count
});

export const recolor = () => ({
  type: RECOLOR
});
