import { connectAdvanced } from 'react-redux';

import { getBounds } from '../series/series';

import { zoomIn, zoomOut, scrollLeft, scrollRight, getZoomBounds } from './zooming';

export const zoomConnector = connectAdvanced(
  dispatch => (state, ownProps) => {
    const series = ownProps.series(state);
    const seriesBounds = getBounds(series);
    const {minY, maxY} = seriesBounds;
    const {xMin, xMax} = getZoomBounds(ownProps.zooming(state), seriesBounds);
    return Object.assign({}, ownProps,
      {
        chartItems: series.get('chartItems'),
        yMin: 0 <= minY ? 0 : minY,
        yMax: 200 >= maxY ? 200 : maxY,
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
