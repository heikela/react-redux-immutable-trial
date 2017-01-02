import React, { Component } from 'react';

class SeriesSegment extends Component {
  render() {
    const { node, offset, walkFunc } = this.props;
    /* eslint-disable no-use-before-define */
    const elements = seriesElementsFromNode(node, offset, walkFunc);
    /* eslint-enable no-use-before-define */
    return (<g key={offset}>
      {elements}
    </g>);
  };

  shouldComponentUpdate(newProps) {
    return newProps.node !== this.props.node;
  }
};

const SeriesElement = (props) => {
  const node = props.node;
  return (<circle cx={node.x} cy={node.y} r="1" fill={node.c} key={props.offset} />);
};

const seriesElementsFromWalk = (walkFunc) => {
  var result = [];
  walkFunc((item, offset, walkFunc) => {
    const ElementType = walkFunc ? SeriesSegment : SeriesElement;
    result.push(<ElementType node={item} walkFunc={walkFunc} offset={offset} key={offset}/>);
  });
  return result;
}

const seriesElementsFromList = (list) =>
  seriesElementsFromWalk((fn) => list.walkTree(fn));

const seriesElementsFromNode = (node, offset, walkFunc) =>
  seriesElementsFromWalk((fn) => walkFunc(fn, node, offset));

export const SeriesComponent = ({items}) => (
  <g>
    {seriesElementsFromList(items)}
  </g>
);
