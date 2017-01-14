import {Map} from '../../immutable-js/dist/immutable';

const ZOOM_FACTOR = 0.25;
const SCROLL_FACTOR = 0.002;

const initialState = Map({
  xMin: 0,
  xMax: 10,
  yMin: 0,
  yMax: 200,
  followingRightEdge: true,
  followingLeftEdge: true
});

export const zoomOut = (amount, bounds) => ({
  type: 'ZOOM_OUT',
  payload: {
    amount,
    bounds
  }
});

export const zoomIn = (amount, bounds) => ({
  type: 'ZOOM_IN',
  payload: {
    amount,
    bounds
  }
});

export const scrollLeft = (amount, bounds) => ({
  type: 'SCROLL',
  payload: {
    amount: -amount,
    bounds
  }
});

export const scrollRight = (amount, bounds) => ({
  type: 'SCROLL',
  payload: {
    amount,
    bounds
  }
});

const scrollBy = (state, amount) => {
  return state
    .set('xMin', state.get('xMin') + amount)
    .set('xMax', state.get('xMax') + amount);
};

const width = (state) => state.get('xMax') - state.get('xMin');

const zoomByPercent = (state, percent) => {
  const safePercent = percent < 50 ? percent : 50;
  const mid = (state.get('xMax') + state.get('xMin')) / 2;
  const halfWidth = width(state) / 2;
  return state
    .set('xMin', mid - (1 - 0.01 * safePercent) * halfWidth)
    .set('xMax', mid + (1 - 0.01 * safePercent) * halfWidth);
};

const clampToRightEdge = (state, bounds) => {
  const overflow = state.get('xMax') - bounds.xMax;
  if (overflow > 0) {
    return state
      .set('xMax', bounds.xMax)
      .set('xMin', state.get('xMin') - overflow)
      .set('followingRightEdge', true);
  } else {
    return state;
  }
}

const clampToLeftEdge = (state, bounds) => {
  const overflow = bounds.xMin - state.get('xMin');
  if (overflow > 0) {
    if (state.followingRightEdge) {
      return state
        .set('xMin', bounds.xMin)
        .set('followingLeftEdge', true);
    } else {
      return state
        .set('xMin', bounds.xMin)
        .set('xMax', state.get('xMax') + overflow)
        .set('followingLeftEdge', true);
    }
  } else {
    return state;
  }
}

const updateByFollowing = (state, bounds) => {
  const followLeft = state.get('followingLeftEdge');
  const followRight = state.get('followingRightEdge');
  if (followLeft && followRight) {
    return state
      .set('xMin', bounds.xMin)
      .set('xMax', bounds.xMax)
  } else if (followLeft) {
    const deltaX = bounds.xMin - state.get('xMin');
    return state
      .set('xMin', bounds.xMin)
      .update('xMax', x => x + deltaX);
  } else if (followRight) {
    const deltaX = bounds.xMax - state.get('xMax');
    return state
      .set('xMax', bounds.xMax)
      .update('xMin', x => x + deltaX);
  } else {
    return state;
  }
}

const clampToEdges = (state, bounds) => clampToLeftEdge(clampToRightEdge(state, bounds), bounds);

const releaseLeftEdge = (state) => state.set('followingLeftEdge', false);

const releaseEdges = (state) =>
  state
    .set('followingLeftEdge', false)
    .set('followingRightEdge', false);

export const getZoomBounds = (state, bounds) => {
  const updated = updateByFollowing(state, bounds);
  return {
    xMin: updated.get('xMin'),
    xMax: updated.get('xMax'),
    yMin: updated.get('yMin'),
    yMax: updated.get('yMax')
  }
}

export const zooming = (state = initialState, action) => {
  switch (action.type) {
    case 'ZOOM_OUT':{
      const bounds = action.payload.bounds;
      const initial = updateByFollowing(state, bounds);
      return clampToEdges(zoomByPercent(initial, -action.payload.amount * ZOOM_FACTOR), bounds);
    }
    case 'ZOOM_IN': {
      const bounds = action.payload.bounds;
      const initial = updateByFollowing(state, bounds);
      return clampToEdges(zoomByPercent(releaseLeftEdge(initial), action.payload.amount * ZOOM_FACTOR), bounds);
    }
    case 'SCROLL': {
      const bounds = action.payload.bounds;
      const initial = updateByFollowing(state, bounds);
      return clampToEdges(scrollBy(releaseEdges(initial), action.payload.amount * SCROLL_FACTOR * width(state)), bounds);
    }
    default: return state
  }
};
