import React, { SVGProps } from 'react';

interface XAxisProps {
  type: 'number' | 'category';
  orientation: 'top' | 'bottom';
  width: number;
  height: number;
}

type Props = Omit<SVGProps<SVGElement>, 'scale'> & XAxisProps;

const XAxis: React.FC<Props> = (props) => {
  const { width, height, type, orientation, ...others } = props;

  return <line width={width} height={height} type={type} orientation={orientation}></line>;
};
