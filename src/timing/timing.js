import { RECOLOR, ADD_ITEMS } from '../series/seriesActions';

const initialState = {
  prevTiming: window.performance.now(),
  count: 0
};

const logPerformance = (state) => {
  const seconds = (window.performance.now() - state.prevTiming) / 1000;
  const operations = state.count;
  const operationsPerSecond = operations / seconds;
  console.log(operations + " operations in " + seconds + " s = " + operationsPerSecond + " operations/s");
  return ({
    prevTiming: window.performance.now(),
    count: 0
  });
};

export const timing = (state = initialState, action) => {
  switch (action.type) {
    case RECOLOR: // fall through
    case ADD_ITEMS: {
      const newCount = state.count + 1;
      const stateWithUpdatedCount = {prevTiming: state.prevTiming, count: newCount};
      if (newCount % 1000 === 0) {
        return logPerformance(stateWithUpdatedCount);
      } else {
        return stateWithUpdatedCount;
      }
    }
    case 'logPerformance': return logPerformance(state);
    default: return state;
  }
}
