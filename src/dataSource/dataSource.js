import * as seriesActions from '../series/seriesActions';
import {releaseLeftEdge} from '../zooming/zoomActions';
import {bindActionCreators} from 'redux';

const relevantActions = {
  ...seriesActions,
  releaseLeftEdge
}

export const setupDataStream = (dispatch, scrollAfter = 0) => {
  const actionsWithDispatch = bindActionCreators(relevantActions, dispatch);
  var scrollAfter = scrollAfter;
  var eventCount = 0;

  function addAndRecolor(count, scrollAfter = 0) {
    return function dispatchAddAndSmoothen() {
      if (scrollAfter) {
        ++eventCount;
        if (eventCount === scrollAfter) {
          actionsWithDispatch.releaseLeftEdge()
        }
      }
      actionsWithDispatch.addItems(count);
      actionsWithDispatch.recolor();
    };
  };

  window.setInterval(addAndRecolor(10, scrollAfter), 10);
};
