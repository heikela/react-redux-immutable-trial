import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from '../immutable-js/dist/immutable.js';

const GraphContainer = (props) => {
  const node = props.node;
  const level = props.level;
  const offset = props.offset;
  const left = props.left;
  const right = props.right;
  /* eslint-disable no-use-before-define */
  const elements = graphElementsFromNode(node, offset, level, left, right);
  /* eslint-enable no-use-before-define */
  return (<g key={props.offset}>
    {elements}
  </g>);
};

const GraphSegment = (props) => {
  const node = props.node;
  return (<circle cx={node.x} cy={node.y} r="1" key={props.key}/>);
};

const graphElementsFromWalk = (walkFunc) => {
  var result = [];
  walkFunc((item, offset, level, left, right) => {
  //  console.log('walkFunc called', item, offset, level, left, right);
    const elementType = level < 0 ? GraphSegment : GraphContainer;
    result.push(elementType({node: item, level: level, offset: offset, left: left, right: right, key: offset}));
  });
  return result;
}

const graphElementsFromList = (list) =>
  graphElementsFromWalk((fn) => list.walkTree(fn));

const walkNode = List.prototype.getWalkNodeFn();

const graphElementsFromNode = (node, offset, level, left, right) =>
  graphElementsFromWalk((fn) => walkNode(fn, node, offset, level, left, right));

class GraphView extends Component {
  render() {
    const items = this.props.chartItems;
    const lastItem = this.props.prevItem;
    const lastX = lastItem ? lastItem.x : 0;
    const xLimit = Math.max(100, lastX);
    const xScale = 95.0/xLimit;
    const scale = "scale(" + xScale + " 1)";
//    console.log(items);
    return (
      <svg viewBox="0 0 100 100">
      <g stroke="red" fill="none" transform={scale}>
        {graphElementsFromList(items)}
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
