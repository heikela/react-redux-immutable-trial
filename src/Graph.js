import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { seriesElementsFromList } from './Series';
import { getBounds } from './state/series';
import { XAxis, YAxis } from './Axis';

const calculateTransform = (outer1, outer2, inner1, inner2) => {
  const dInner = inner2 - inner1;
  const dOuter = outer2 - outer1;
  const factor = dOuter / dInner;
  return {
    factor: factor,
    constant: outer1 - inner1 * factor
  }
};

class GraphView extends Component {
  render() {
    const {x1, y1, x2, y2} = this.props;
    const {xMin, xMax, yMin, yMax} = this.props;
    const items = this.props.chartItems;

    const xTransform = calculateTransform(x1, x2, xMin, xMax);
    const yTransform = calculateTransform(y1, y2, yMin, yMax);
    const transform = 'matrix(' + xTransform.factor + ',0,0,'
      + yTransform.factor + ',' + xTransform.constant + ',' + yTransform.constant + ')';

    return (
       <g>
        <YAxis x={x1} width={10} yMin={y1} yMax={y2} yMinVal={yMin} yMaxVal={yMax} />
        <XAxis y={y1} width={10} xMin={x1} xMax={x2} xMinVal={xMin} xMaxVal={xMax} />
        <g stroke="none" fill="red" transform={transform}>
          {seriesElementsFromList(items)}
        </g>
      </g>
    )
  }
}

export const Graph = connect(
  state => {
    const {minX, maxX, minY, maxY} = getBounds(state.get('series'));
    return {
      chartItems: state.getIn(['series', 'chartItems']),
      prevItem: state.getIn(['series', 'prevItem']),
      xMin: minX < 0 ? minX : 0,
      xMax: maxX > 10 ? maxX : 10,
      yMin: 0 <= minY ? 0 : minY,
      yMax: 200 >= maxY ? 200 : maxY
    };
  }
)(GraphView);
