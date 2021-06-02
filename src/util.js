export const GRADE = {
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
  CLASS: {
    G3: 'is-success',
    G2: 'is-danger',
    G1: 'is-info',
  },
};

export const findKeyByName = (gradeName) => {
  for (const [k, v] of Object.entries(GRADE.NAME)) {
    if (new RegExp(v).test(gradeName)) {
      return k;
    }
  }
  return null;
};

export const getGradeColorByName = (gradeName) => {
  const key = findKeyByName(gradeName);
  return key === null ? '#989996' : GRADE.COLOR[key];
};

export const getGradeClassByName = (gradeName) => {
  const key = findKeyByName(gradeName);
  return key === null ? null : GRADE.CLASS[key];
};
