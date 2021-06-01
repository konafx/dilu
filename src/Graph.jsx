import React from 'react';
import { ScatterChart, Scatter, CartesianGrid, XAxis, YAxis } from 'recharts';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import races from './assets/race.json';
import Race from './components/Race';

const Races = (props) => {
  const { race, x, y, cx, cy } = props;
  return (
    <foreignObject x={x} y={y} width="200" height="200">
      <div dangerouslySetInnerHTML={{ __html: `<!-- ${cx} ${cy} -->` }} />
      <Race {...race} />
    </foreignObject>
  );
};

Races.propTypes = {
  race: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number,
  cx: PropTypes.number,
  cy: PropTypes.number,
};

const Graph = () => {
  const scat = races.map((race) => {
    const distance = race.course.distance;
    const date = dayjs(race.date).unix();
    return { distance, date, race };
  });

  console.log(scat);

  const formatUtToDate = (tickItem) => {
    return dayjs.unix(tickItem).format('MM/DD');
  };

  const ymin = dayjs('2021/01/01').unix();
  const ymax = dayjs('2021/12/31').unix();

  return (
    <ScatterChart width={1200} height={24200} margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="distance" domain={['dataMin', 'dataMax']} type="number" name="距離" unit="m" orientation="top" />
      <YAxis
        dataKey="date"
        domain={[ymin, ymax]}
        type="number"
        name="日付"
        reversed
        tickFormatter={formatUtToDate}
        tickCount={25}
      />
      <Scatter name="race" data={scat} legendType="none" shape={<Races />} />
    </ScatterChart>
  );
};

export default Graph;
