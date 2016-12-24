import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { graphElementsFromList } from './Chart';

const ticks = (limit) => {
  const tickSize = [1000000, 200000, 100000, 20000, 10000, 2000, 1000, 200, 100, 10, 1, 0.1, 0.01, 0.001, 0.0001].find(tick => tick < limit);
  if (!tickSize) return [];
  return _.range(0, limit, tickSize);
}

class GraphView extends Component {
  render() {
    const items = this.props.chartItems;
    const lastItem = this.props.prevItem;
    const lastX = lastItem ? lastItem.x : 0;
    const xLimit = Math.max(180, lastX);
    const xScale = 180.0/xLimit;
//    const transform = "scale(" + xScale + " 1)";
    const xTranslation = -Math.max(0, lastX - 180);
    const transform = "translate(" + xTranslation + ")";

    const axisTicks = ticks(xLimit).map(x => {
      const scaledX = x * xScale;
      return (<g key={x}>
        <line x1={scaledX} y1="0" x2={scaledX} y2="10" />
        <text x={scaledX} y="20" fontSize="10">
          {x}
        </text>
      </g>
      );
    });

    return (
      <svg width="600" height="600" viewBox="0 0 200 200" onClick={this.props.addThousand}>
      <g stroke="black" fill="black" strokeWidth="0.5">
        <line x1="0" y1="5" x2="180" y2="5" />
        {axisTicks}
      </g>
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
