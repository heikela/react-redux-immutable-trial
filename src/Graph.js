import React, { Component } from 'react';
import { connect } from 'react-redux';

class GraphView extends Component {
  render() {
    const items = this.props.chartItems;
    const lastItem = this.props.prevItem;
    const lastX = lastItem ? lastItem.x : 0;
    const xLimit = Math.max(100, lastX);
    const xScale = 95.0/xLimit;
    const scale = "scale(" + xScale + " 1)";
    return (
      <svg viewBox="0 0 100 100">
      <g stroke="red" fill="none" transform={scale}>
        {items.map(({x, y}, idx) => (<circle cx={x} cy={y} r="1" key={idx}/>))}
        </g>
      </svg>
    )
  }
}

export const Graph = connect(
  state => ({
    chartItems: state.chartItems,
    prevItem: state.prevItem
  })
)(GraphView);
