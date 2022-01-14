import React from 'react';
import { Group } from '@visx/group';
import { curveBasis } from '@visx/curve';
import { Circle, LinePath } from '@visx/shape';
import { Threshold } from '@visx/threshold';
import { scaleTime, scaleLinear } from '@visx/scale';
import { AxisLeft, AxisBottom, AxisTop } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { timeFormat } from 'd3-time-format';

import raceData from '../assets/race.json';
import { RaceData } from '../types/json';

export const background = '#f3f3f3';

// accessors
const date = (d: RaceData) => new Date(d.date).valueOf();
const distance = (d: RaceData) => d.course.distance;

// scales
const timeScale = scaleTime<number>({
  domain: [new Date('2021/1/1').valueOf(), new Date('2021/12/31').valueOf()],
});
const distanceScale = scaleLinear<number>({
  domain: [800, Math.max(...raceData.map(distance))],
  nice: true,
});

const defaultMargin = { top: 40, right: 30, bottom: 50, left: 40 };

type Props = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

const Races: React.FC<Props> = ({ width, height, margin = defaultMargin }) => {
  if (width < 10) return null;

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  timeScale.range([0, yMax]);
  distanceScale.range([0, xMax]);
  console.log({ xMax, yMax });

  return (
    <section className="section">
      <div className="container">
        <div className="content">
          <svg width={width} height={height}>
            <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
            <Group left={margin.left} top={margin.top}>
              <GridRows scale={timeScale} width={xMax} height={yMax} stroke="#e0e0e0" />
              <GridColumns scale={distanceScale} width={xMax} height={yMax} stroke="#e0e0e0" />
              <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke="#e0e0e0" />
              <AxisTop top={0} scale={distanceScale} numTicks={width > 520 ? 10 : 5} />
              <AxisLeft scale={timeScale} tickFormat={(v: Date, i: number) => timeFormat('%m/%d')(v)} />
              <text x="-70" y="15" transform="rotate(-90)" fontSize={10}>
                距離
              </text>
              <Group pointerEvents="none">
                {raceData.map((d, i) => (
                  <Circle
                    key={`point-${i}`}
                    className="dot"
                    cx={distanceScale(distance(d)) ?? 0}
                    cy={timeScale(date(d)) ?? 0}
                    r="3"
                    fill="#f6c431"
                  />
                ))}
              </Group>
            </Group>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Races;
