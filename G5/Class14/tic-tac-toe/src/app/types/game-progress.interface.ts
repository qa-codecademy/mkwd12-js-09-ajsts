export interface GameProgress {
  // The object using this  interface will have only 2 props by the keys: X and O
  X: number[];
  O: number[];

  // [key: string]: number[]; // We can have as many keys (props) as we want
}

const gameProgressOne: GameProgress = {
  X: [],
  O: [],
};

// const gameProgressTwo: GameProgress = {
//   PLAYER_ONE: [],
//   PLAYER_TWO: [],

//   GJORGE: [],
//   ALEK: [1, 2],

// };
