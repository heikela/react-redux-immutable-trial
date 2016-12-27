import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { graphElementsFromList } from './Chart';
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
    const lastItem = this.props.prevItem;
    const lastX = lastItem ? lastItem.x : 0;
    const xLimit = Math.max(200, lastX);
    const actualXMax = xMax ? xMax : xLimit;

    const xTransform = calculateTransform(x1, x2, 0, actualXMax);
    const yTransform = calculateTransform(y1, y2, yMin, yMax);
    const transform = 'matrix(' + xTransform.factor + ',0,0,'
      + yTransform.factor + ',' + xTransform.constant + ',' + yTransform.constant + ')';

    return (
      <svg width="600" height="600" viewBox="0 0 200 200" onClick={this.props.addThousand}>
        <YAxis x={x1} width={10} yMin={y1} yMax={y2} yMinVal={yMin} yMaxVal={yMax} />
        <XAxis y={y1} width={10} xMin={x1} xMax={x2} xMinVal={xMin} xMaxVal={actualXMax} />
        <g stroke="none" fill="red" transform={transform}>
          {graphElementsFromList(items)}
        </g>
      </svg>
    )
  }
}

export const Graph = connect(
  state => ({
    chartItems: state.chart.chartItems,
    prevItem: state.chart.prevItem
  }),
  dispatch => ({
    addThousand: () => dispatch({type: 'addItems', payload: 1000})
  })
)(GraphView);
