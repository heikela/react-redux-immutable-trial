import React, { Component } from 'react';
import _ from 'lodash';

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

class Graph extends Component {
  render() {
    const {width, height} = this.props;
    const {x1, y1, x2, y2} = this.props;
    const {xMin, xMax, yMin, yMax} = this.props;
    const items = this.props.chartItems;

    const viewBox = '' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2;

    const xTransform = calculateTransform(x1, x2, xMin, xMax);
    const yTransform = calculateTransform(y1, y2, yMin, yMax);
    const transform = 'matrix(' + xTransform.factor + ',0,0,'
      + yTransform.factor + ',' + xTransform.constant + ',' + yTransform.constant + ')';

    return (
      <svg width={width} height={height} viewBox={viewBox} pointerEvents="all"
        onWheel={this.props.onWheel}>
        <rect x={x1} y={y1} width={x2-x1} height={y2-y1} fill="blue" visibility="hidden"/>
        <YAxis x={x1} width={10} yMin={y1} yMax={y2} yMinVal={yMin} yMaxVal={yMax} />
        <XAxis y={y1} width={10} xMin={x1} xMax={x2} xMinVal={xMin} xMaxVal={xMax} />
        <g stroke="none" fill="red" transform={transform}>
          {this.props.children}
        </g>
      </svg>
    )
  }
}

export default Graph;
