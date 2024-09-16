import { inject, Injectable } from '@angular/core';
import { GameStateService } from './game-state.service';
import { GameStore } from '../store/game.store';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  gameStore = inject(GameStore);

  constructor(private readonly gameState: GameStateService) {}

  makeMove(move: number) {
    // USING SUBJECTS
    // this.gameState.makeMove(move);

    // USING STORE
    this.gameStore.makeMove(move);
  }

  resetGame() {
    // USING SUBJECTS
    // this.gameState.resetGame();

    //USING STORE
    this.gameStore.resetGame();
  }
}
