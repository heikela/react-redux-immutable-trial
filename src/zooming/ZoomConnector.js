import { connectAdvanced } from 'react-redux';

import { getBounds } from '../series/series';

import { zoomIn, zoomOut, scrollLeft, scrollRight, getZoomBounds } from './zooming';

export const zoomConnector = connectAdvanced(
  dispatch => (state, ownProps) => {
    const series = ownProps.series(state);
    const seriesBounds = getBounds(series);
    const {yMin, yMax} = seriesBounds;
    const {xMin, xMax} = getZoomBounds(ownProps.zooming(state), seriesBounds);
    return Object.assign({}, ownProps,
      {
        yMin: 0 <= yMin ? 0 : yMin,
        yMax: 200 >= yMax ? 200 : yMax,
        xMin, xMax,
        onWheel: (e) => {
          e.preventDefault();
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            if (e.deltaX < 0) {
              dispatch(scrollLeft(-e.deltaX, seriesBounds));
            } else if (e.deltaX > 0) {
              dispatch(scrollRight(e.deltaX, seriesBounds));
            }
          } else {
            if (e.deltaY < 0) {
              dispatch(zoomIn(-e.deltaY, seriesBounds));
            } else if (e.deltaY > 0) {
              dispatch(zoomOut(e.deltaY, seriesBounds));
            }
          }
        }
      }
    );
  }
);
