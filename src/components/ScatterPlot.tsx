import React, { SVGProps } from 'react';


interface ScatterPlotProps {
    witdh: number;
    height: number;
}

type Props = Omit<SVGProps<SVGSVGElement>, 'viewBox'> & ScatterPlotProps;

const ScatterPlot: React.FC<Props> = props => {

    return (
        <svg>
        </svg>
    );
};
