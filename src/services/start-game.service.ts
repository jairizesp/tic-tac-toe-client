import { BehaviorSubject } from "rxjs";
import { Players } from "../components/start-new-game.component";

export class StartGame {
  private static instance: StartGame;

  // players = {
  //   player1: "",
  //   player2: "",
  // };

  _startNewGame = new BehaviorSubject<Players | null>(null);
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

  hasPlayers(players: Players) {
    this._startNewGame.next(players);
  }

  setPlayers(players: Players) {
    this._startNewGame.next(players);
  }

  setNewGame(isNewGame: boolean) {
    this._isNewGame.next(isNewGame);
  }

  clearPlayers() {
    this._startNewGame.next(null);
  }
}
