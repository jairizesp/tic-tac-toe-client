import { BehaviorSubject } from "rxjs";

export interface Player {
  name: string;
  wins: number;
  losses: number;
}

export interface IPlayers {
  player1: Player;
  player2: Player;
}

export class StartGame {
  private static instance: StartGame;

  // players = {
  //   player1: "",
  //   player2: "",
  // };

  _startNewGame = new BehaviorSubject<IPlayers | null>(null);
  _isNewGame = new BehaviorSubject<boolean>(true);

  static getInstance(): StartGame {
    if (!StartGame.instance) {
      StartGame.instance = new StartGame();
    }
    return StartGame.instance;
  }

  get startNewGame() {
    return this._startNewGame.asObservable();
  }

  setPlayers(players: IPlayers) {
    this._startNewGame.next(players);
  }

  setNewGame(isNewGame: boolean) {
    this._isNewGame.next(isNewGame);
  }

  clearPlayers() {
    this._startNewGame.next(null);
  }
}
