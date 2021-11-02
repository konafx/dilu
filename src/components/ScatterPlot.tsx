import React, { ReactNode, SVGProps } from 'react';

interface ScatterPlotProps {
  width: number;
  height: number;
  children?: ReactNode;
}

type Props = Omit<SVGProps<SVGSVGElement>, 'viewBox'> & ScatterPlotProps;

const ScatterPlot: React.FC<Props> = ({ width = 0, height = 30, children, ...others }) => {
  return (
    <svg width={width} height={height} x={20} y={30} version="1.1">
      {children}
    </svg>
  );
};

export default ScatterPlot;
