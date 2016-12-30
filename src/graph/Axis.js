import React from 'react';
import _ from 'lodash';

const axisTickOptions = [
  1000000,
  500000,
  200000,
  100000,
  50000,
  20000,
  10000,
  5000,
  2000,
  1000,
  500,
  200,
  100,
  50,
  20,
  10,
  5,
  2,
  1,
  0.1,
  0.01,
  0.001,
  0.0001
];

const getTickSize = (distance) => {
  const tickSize = axisTickOptions.find(tick => tick * 2 <= distance);
  return tickSize ? tickSize : 0.0001;
};

const calculateTicks = (min, max, minVal, maxVal) => {
  const dVal = maxVal - minVal;
  const d = max - min;
  const tickSize = getTickSize(dVal);
  const firstTick = Math.ceil(minVal / tickSize) * tickSize;
  const tickVals = _.range(firstTick, maxVal, tickSize);
  const valToCoord = val => (val - minVal) * (d / dVal) + min;
  return tickVals.map(val => ({
    val: val,
    coord: valToCoord(val)
  }));
};

export const YAxis = ({x, width, yMin, yMax, yMinVal, yMaxVal}) => {
  const ticks = calculateTicks(yMin, yMax, yMinVal, yMaxVal);
  const tickElements = ticks.map(({val, coord}) => (
    <g key={val}>
      <line x1={x - width * 0.5} y1={coord} x2={x + width * 0.5} y2={coord} />
      <text x={x} y={coord} fontSize="10">
        {val}
      </text>
    </g>
  ));

  return <g stroke="black" fill="black" strokeWidth="0.5">
    <line x1={x} y1={yMin} x2={x} y2={yMax} />
      {tickElements}
  </g>
};

export const XAxis = ({y, width, xMin, xMax, xMinVal, xMaxVal}) => {
  const ticks = calculateTicks(xMin, xMax, xMinVal, xMaxVal);
  const tickElements = ticks.map(({val, coord}) => (
    <g key={val}>
      <line x1={coord} y1={y - width * 0.5} x2={coord} y2={y + width * 0.5} />
      <text x={coord} y={y + 10} fontSize="10">
        {val}
      </text>
    </g>
  ));

  return <g stroke="black" fill="black" strokeWidth="0.5">
    <line x1={xMin} y1={y} x2={xMax} y2={y} />
      {tickElements}
  </g>
};
