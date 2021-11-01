import React, { ReactNode, SVGProps } from 'react';

interface ScatterPlotProps {
  width: number;
  height: number;
  children?: ReactNode;
}

type Props = Omit<SVGProps<SVGSVGElement>, 'viewBox'> & ScatterPlotProps;

const ScatterPlot: React.FC<Props> = (props) => {
  const { width, height, children, ...others } = props;

  return (
    <svg width={width} height={height} version="1.1">
      {children}
    </svg>
  );
};
