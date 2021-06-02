import React from 'react';
import { XAxis } from 'recharts';

const DistanceAxis = () => {
  const xmin = 800;
  const xmax = 4800;
  return (
    <XAxis
      dataKey="distance"
      domain={[xmin, xmax]}
      type="number"
      name="距離"
      unit="m"
      orientation="top"
      ticks={[...Array(20)].map((_, i) => 200 * i + xmin).filter((v) => xmin <= v && v < xmax)}
    />
  );
};

export default DistanceAxis;
