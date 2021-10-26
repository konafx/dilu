import React, { SVGProps } from 'react';

interface ScatterPlotProps {
  width: number;
  height: number;
}

type Props = Omit<SVGProps<SVGSVGElement>, 'viewBox'> & ScatterPlotProps;

const ScatterPlot: React.FC<Props> = (props) => {
  const { width, height, ...others } = props;

  return <svg width={width} height={height} version="1.1"></svg>;
};
