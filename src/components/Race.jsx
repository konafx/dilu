import React from 'react';
import PropTypes from 'prop-types';

import { getGradeClassByName } from '../util';

const Race = (props) => {
  const { grade, name, age, femaleOnly, course } = props;
  const gradeClass = getGradeClassByName(grade);
  return (
    <div className="card is-small">
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-6">
              <span className={['tag', gradeClass, 'mr-1'].join(' ')}>{grade}</span>
              {name}
            </p>
            <p className="subtitle is-6">
              {course.course} {course.distance} <br />
              {age.age}歳{age.more ? '以上' : ''} {femaleOnly ? '牝' : '牡・牝'} <br />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

Race.propTypes = {
  date: PropTypes.string,
  grade: PropTypes.string,
  name: PropTypes.string,
  age: PropTypes.shape({
    age: PropTypes.number,
    more: PropTypes.bool,
  }),
  femaleOnly: PropTypes.bool,
  course: PropTypes.shape({
    place: PropTypes.string,
    course: PropTypes.oneOf(['芝', 'ダ', '障']),
    distance: PropTypes.number,
  }),
};

export default Race;
