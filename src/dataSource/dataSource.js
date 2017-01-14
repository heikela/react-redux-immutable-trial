import * as seriesActions from '../series/seriesActions'
import {bindActionCreators} from 'redux'

export const setupDataStream = (dispatch) => {
  const actionsWithDispatch = bindActionCreators(seriesActions, dispatch);

  const addAndRecolor = (count) => function dispatchAddAndSmoothen() {
    actionsWithDispatch.addItems(count);
    actionsWithDispatch.recolor();
  }

  window.setInterval(addAndRecolor(10), 10);
}
