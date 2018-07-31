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

export const releaseLeftEdge = () => ({
  type: 'RELESE_LEFT_EDGE'
})
