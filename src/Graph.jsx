import React from 'react';
import { ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import PropTypes from 'prop-types';

const CustomElement = (props) => {
  console.log({ ...props });
  const { xx, x, y, width, height } = props;
  console.log({ xx });
  return (
    <foreignObject x={x} y={y} width={width + 100} height={height + 100}>
      <div className="box">sample: {xx}</div>
    </foreignObject>
  );
};

CustomElement.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  xx: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

const Graph = () => {
  const scat = [
    { x: 100, y: 200, z: 200, xx: 1230 },
    { x: 120, y: 100, z: 260, xx: 1230 },
    { x: 170, y: 300, z: 400, xx: 1230 },
    { x: 140, y: 250, z: 280, xx: 1230 },
    { x: 150, y: 400, z: 500, xx: 1230 },
    { x: 110, y: 280, z: 200, xx: 1230 },
  ];

  console.log(scat);

  return (
    <ScatterChart width={400} height={400} margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" dataKey="x" name="stature" unit="cm" />
      <YAxis type="number" dataKey="y" name="weight" unit="kg" />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Scatter name="A school" data={scat} fill="#8884d8" shape={<CustomElement />} />
    </ScatterChart>
  );
};

export default Graph;
