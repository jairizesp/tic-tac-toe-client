import "./App.css";
import Board from "./components/board.component";
import logo from "./assets/590-5903239_hash-png-picture-tic-tac-toe-board-svg.svg";
import StartNewGame from "./components/start-new-game.component";
import Modal from "./utils/ui/modal.component";
import { useEffect, useState } from "react";
import { StartGame } from "./services/start-game.service";
import GameHistory from "./components/game-history.component";
import { Subscription } from "rxjs";
import Button from "./utils/ui/button.component";

function App() {
  const [hasPlayers, setHasPlayers] = useState(false);
  const [isNewGame, setIsNewGame] = useState(false);

  const startGame = StartGame.getInstance();

  useEffect(() => {
    const startGameSubscription = startGame.startNewGame.subscribe((data) => {
      data?.player1 && data?.player2
        ? setHasPlayers(true)
        : setHasPlayers(false);
    });

    const newGameSubscription = startGame._isNewGame.subscribe((data) => {
      setIsNewGame(data);
      console.log(data);
    });

    return () => {
      startGameSubscription.unsubscribe();
      newGameSubscription.unsubscribe();
    };
  }, []);

  return (
    <div className="w-screen h-screen flex">
      <div className="flex flex-col shrink grow basis-auto">
        <div className="flex justify-start items-center gap-x-4 pt-8 pl-8">
          <img src={logo} alt="" className="w-12 h-12" />
          <strong className="text-2xl text-[#6b21a8]">Tic Tac Toe</strong>
        </div>

        <div className="flex justify-center items-center h-full">
          <StartNewGame />
        </div>
      </div>
      <div className="flex shrink grow basis-auto justify-center items-center bg-[#e9d5ff]">
        {hasPlayers ? (
          isNewGame ? (
            <Button
              name="new-game"
              label="Start Game"
              onClick={() => startGame.setNewGame(false)}
            />
          ) : (
            <Board />
          )
        ) : (
          <GameHistory />
        )}
      </div>
    </div>
  );
}

export default App;
