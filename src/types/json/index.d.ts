export interface RaceData {
  date: string;
  // grade: 'GⅢ' | 'GⅡ' | 'GⅠ';
  grade: string;
  name: string;
  age: {
    age: number;
    more: boolean;
  };
  femaleOnly: boolean;
  course: {
    place: string;
    // course: 'ダ' | '芝' | '障';
    course: string;
    distance: number;
  };
}

declare module '*/race.json' {
  const values: RaceData[];
  export = values;
}
