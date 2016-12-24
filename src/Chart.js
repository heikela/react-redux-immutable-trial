import React, { Component } from 'react';

class GraphContainer extends Component {
  render() {
    const { node, offset, walkFunc } = this.props;
    /* eslint-disable no-use-before-define */
    const elements = graphElementsFromNode(node, offset, walkFunc);
    /* eslint-enable no-use-before-define */
    return (<g key={offset}>
      {elements}
    </g>);
  };

  shouldComponentUpdate(newProps) {
    return newProps.node !== this.props.node;
  }
};

const GraphSegment = (props) => {
  const node = props.node;
  return (<circle cx={node.x} cy={node.y} r="1" fill={node.c} key={props.offset} />);
};

const graphElementsFromWalk = (walkFunc) => {
  var result = [];
  walkFunc((item, offset, walkFunc) => {
    const ElementType = walkFunc ? GraphContainer : GraphSegment;
    result.push(<ElementType node={item} walkFunc={walkFunc} offset={offset} key={offset}/>);
  });
  return result;
}

export const graphElementsFromList = (list) =>
  graphElementsFromWalk((fn) => list.walkTree(fn));

const graphElementsFromNode = (node, offset, walkFunc) =>
  graphElementsFromWalk((fn) => walkFunc(fn, node, offset));
