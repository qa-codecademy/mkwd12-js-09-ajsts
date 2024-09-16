import { Component, signal, OnInit, inject } from '@angular/core';
import { GameService } from '../services/game.service';
import { GameStateService } from '../services/game-state.service';
import { GameStore } from '../store/game.store';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit {
  board = signal<string[]>([]);
  currentPlayer = signal<'X' | 'O'>('X');
  winner = signal<string | null>(null);
  isGameOver = signal<boolean>(false);

  // USING THE STORE
  gameStore = inject(GameStore);

  constructor(
    private readonly gameService: GameService,
    private readonly gameState: GameStateService
  ) {}

  private generateBoard() {
    this.board.set(Array.from({ length: 9 }, () => String('')));
  }

  // USING THE OBSERAVABLES
  // makeMove(move: number) {
  //   if (this.winner() || this.isGameOver()) {
  //     return;
  //   }

  //   const board = this.board();
  //   board[move] = this.currentPlayer();
  //   this.board.set(board);

  //   this.gameService.makeMove(move + 1);
  // }

  // USING THE STORE
  makeMove(move: number) {
    if (this.gameStore.winner() || this.gameStore.isGameOver()) {
      return;
    }

    const board = this.board();
    board[move] = this.gameStore.currentPlayer();
    this.board.set(board);

    this.gameService.makeMove(move + 1);
  }

  reset() {
    this.gameService.resetGame();
    this.generateBoard();
  }

  ngOnInit() {
    this.generateBoard();

    const sub_one = this.gameState.currentPlayer$.subscribe((currentPlayer) => {
      this.currentPlayer.set(currentPlayer);
    });

    const sub_two = this.gameState.winner$.subscribe((winner) =>
      this.winner.set(winner)
    );

    const sub_three = this.gameState.isGameOver$.subscribe((gameOver) =>
      this.isGameOver.set(gameOver)
    );
  }
}
