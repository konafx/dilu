import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { GRADE, getGradeColorByName } from './util';
import races from './assets/race.json';
import Race from './components/Race';
import ScatterPlot from './components/ScatterPlot';

dayjs.extend(weekOfYear);
dayjs.extend(dayOfYear);

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
  const { register, handleSubmit } = useForm();
  const onSubmit = console.log;

  const dayMap = new Map();
  const scat = races.map((race) => {
    const distance = race.course.distance;

    const d = dayjs(race.date);

    const _week = d.week();
    const week = _week > 1 || d.month() === 0 ? _week : d.week(0).week() + 1;
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
    <div className="container">
      <div className="section">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <span className="control is-grouped">
              {GRADE.KEY.map((gradeKey) => (
                <label key={gradeKey} className="checkbox mx-1">
                  <input type="checkbox" {...register(`grade.${gradeKey}`)} />
                  <span className={['tag', `is-${GRADE.CLASS[gradeKey]}`, 'mx-1'].join(' ')}>
                    {GRADE.NAME[gradeKey]}
                  </span>
                </label>
              ))}
            </span>
          </div>
          <input className="button is-primary" type="submit" />
        </form>
        <>
      </div>
    </div>
  );
};

export default Graph;
