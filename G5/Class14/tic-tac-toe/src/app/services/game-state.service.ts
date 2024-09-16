import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameProgress } from '../types/game-progress.interface';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  constructor() {}

  private readonly WINNING_PATTERNS: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  private _currentPlayer = new BehaviorSubject<'X' | 'O'>('X');
  currentPlayer$ = this._currentPlayer.asObservable();

  private _winner = new BehaviorSubject<string | null>(null);
  winner$ = this._winner.asObservable();

  private _isGameOver = new BehaviorSubject<boolean>(false);
  isGameOver$ = this._isGameOver.asObservable();

  private _gameProgress = new BehaviorSubject<GameProgress>({
    X: [],
    O: [],
  });
  gameProgress$ = this._gameProgress.asObservable();

  makeMove(move: number) {
    // X / O / DRAW
    if (this._winner.value || this._isGameOver.value) {
      return;
    }

    /**
     * gameProgress
     * {
     * X: []
     * O: []
     * }
     */
    const currentPlayer = this._currentPlayer.value; // X / O
    const gameProgress = this._gameProgress.value;

    if (gameProgress['X'].includes(move) || gameProgress['O'].includes(move)) {
      return;
    }

    gameProgress[currentPlayer].push(move);
    console.log('GAME_PROGRESS', gameProgress);
    this._gameProgress.next(gameProgress);

    this.checkWinner();
    this.checkDraw();
    this.togglePlayer();
  }

  private togglePlayer() {
    this._currentPlayer.next(this._currentPlayer.value === 'X' ? 'O' : 'X');
  }

  private checkWinner() {
    const currentPlayer = this._currentPlayer.value;
    const gameProgress = this._gameProgress.value;

    for (const pattern of this.WINNING_PATTERNS) {
      //gameProgress[currentPlayer] => [2, 3, 1] => [1, 2, 3]
      if (pattern.every((num) => gameProgress[currentPlayer].includes(num))) {
        this._winner.next(currentPlayer);
        this._isGameOver.next(true);
        console.log('WINNER IS:', currentPlayer);
        return;
      }
    }
  }

  private checkDraw() {
    const gameProgress = this._gameProgress.value;

    if (
      gameProgress['X'].length + gameProgress['O'].length === 9 &&
      !this._isGameOver.value
    ) {
      this._isGameOver.next(true);
      this._winner.next('draw');
      return;
    }
  }

  resetGame() {
    this._currentPlayer.next('X');
    this._winner.next(null);
    this._isGameOver.next(false);
    this._gameProgress.next({ X: [], O: [] });
  }
}
