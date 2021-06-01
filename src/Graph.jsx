import React from 'react';
import { ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, Tooltip, Dot, ZAxis } from 'recharts';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import races from './assets/race.json';
import Race from './components/Race';

const GRADE = {
  NAME: {
    G3: 'GⅢ',
    G2: 'GⅡ',
    G1: 'GⅠ',
  },
  COLOR: {
    G3: '#268300',
    G2: '#D71A1A',
    G1: '#1976D2',
  },
};

const RaceToolTip = ({ active, payload }) => {
  if (active) {
    const race = payload[2].value;
    return <Race {...race} />;
  }

  return null;
};

RaceToolTip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
};

const RaceDot = (props) => {
  const { cx, cy, race } = props;

  const enumGradeColor = (gradeString) => {
    for (const [k, v] of Object.entries(GRADE.NAME)) {
      if (new RegExp(v).test(gradeString)) {
        return GRADE.COLOR[k];
      }
    }
    return '#989996';
  };

  const fill = enumGradeColor(race.grade);

  return (
    <g>
      <Dot cx={cx} cy={cy} r={5} fill={fill} />
      <g transform={`translate(${cx},${cy})`}>
        <text x={10} y={0} dy={4} textAnchor="left">
          {race.name}
        </text>
      </g>
    </g>
  );
};

RaceDot.propTypes = {
  race: PropTypes.object,
  cx: PropTypes.number,
  cy: PropTypes.number,
  fill: PropTypes.string,
};

const Graph = () => {
  const scat = races.map((race) => {
    const distance = race.course.distance;
    const date = dayjs(race.date).unix();
    return { distance, date, race };
  });

  const formatUtToDate = (tickItem) => {
    return dayjs.unix(tickItem).format('MM/DD');
  };

  const ymin = dayjs('2021/01/01').unix();
  const ymax = dayjs('2021/12/31').unix();
  const xmin = 800;
  const xmax = 4800;

  return (
    <ScatterChart width={1200} height={2400} margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="distance"
        domain={[xmin, xmax]}
        type="number"
        name="距離"
        unit="m"
        orientation="top"
        ticks={[...Array(20)].map((_, i) => 200 * i + xmin).filter((v) => xmin <= v && v < xmax)}
      />
      <YAxis
        dataKey="date"
        domain={[ymin, ymax]}
        type="number"
        name="日付"
        reversed
        tickFormatter={formatUtToDate}
        tickCount={25}
      />
      <ZAxis dataKey="race" />
      <Tooltip content={<RaceToolTip />} />
      <Scatter name="race" data={scat} legendType="none" shape={<RaceDot />} />
    </ScatterChart>
  );
};

export default Graph;
