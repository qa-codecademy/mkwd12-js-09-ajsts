import { GameProgress } from '../types/game-progress.interface';

export const WINNING_PATTERNS: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

export const checkWinner = (
  currentPlayer: 'X' | 'O',
  gameProgress: GameProgress
) => {
  for (const pattern of WINNING_PATTERNS) {
    if (pattern.every((num) => gameProgress[currentPlayer].includes(num))) {
      console.log('WINNER IS:', currentPlayer);
      return true;
    }
  }

  return false;
};

export const checkDraw = (gameProgress: GameProgress, isGameOver: boolean) => {
  return (
    gameProgress['X'].length + gameProgress['O'].length === 9 && !isGameOver
  );
};
