import React from 'react';
import { ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, Tooltip, Dot, ZAxis } from 'recharts';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { getGradeColorByName } from './util';

dayjs.extend(weekOfYear);
dayjs.extend(dayOfYear);

import races from './assets/race.json';
import Race from './components/Race';

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

  const fill = getGradeColorByName(race.grade);

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
  const dayMap = new Map();
  const scat = races.map((race) => {
    const distance = race.course.distance;

    const d = dayjs(race.date);

    const _week = d.week();
    const week = _week > 1 || d.month() == 0 ? _week : d.week(0).week() + 1;
    {
      const count = dayMap.get(week);
      if (count) {
        dayMap.set(week, count + 1);
      } else {
        dayMap.set(week, 1);
      }
    }

    const count = dayMap.get(week);
    const date = (week - 1) * 7 + (count - 1);

    return { distance, date, race };
  });

  const formatUtToDate = (tickItem) => {
    return dayjs('2021/01/01').dayOfYear(tickItem).format('MM/DD');
  };

  const ymin = dayjs('2021/01/01').dayOfYear();
  const ymax = dayjs('2021/12/31').dayOfYear();
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
