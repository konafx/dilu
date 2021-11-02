import React, { SVGProps } from 'react';

interface XAxisProps {
  type?: 'number' | 'category';
  orientation?: 'top' | 'bottom';
  width?: number;
  height?: number;
}

type Props = Omit<SVGProps<SVGElement>, 'scale'> & XAxisProps;

const XAxis: React.FC<Props> = ({ type = 'number', orientation = 'top', width = 100, height = 30, ...others }) => {
  const [x1, y1] = [70, 50];

  return (
    <line
      width={width}
      height={height}
      type={type}
      orientation={orientation}
      stroke="black"
      x1={x1}
      y1={y1}
      x2={x1 + width}
      y2={y1}
    ></line>
  );
};

export default XAxis;
