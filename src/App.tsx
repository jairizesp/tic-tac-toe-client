import "./App.css";
import Board from "./components/board.component";
import logo from "./assets/590-5903239_hash-png-picture-tic-tac-toe-board-svg.svg";
import StartNewGame from "./components/start-new-game.component";
import GameHistory from "./components/game-history.component";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import BackButton from "./utils/ui/back-button.component";
import { StartGame } from "./services/start-game.service";
import { useEffect } from "react";

function App() {
  const startGame = StartGame.getInstance();

  useEffect(() => {
    startGame.clearPlayers();
    startGame.setNewGame(true);
  }, []);

  return (
    <div className="w-screen h-screen flex">
      <BrowserRouter>
        <div className="flex flex-col shrink grow basis-auto">
          <div className="flex justify-start items-center gap-x-4 pt-8 pl-8">
            <img src={logo} alt="" className="w-12 h-12" />
            <strong className="text-2xl text-[#6b21a8]">Tic Tac Toe</strong>
          </div>

          <div className="flex justify-center items-center h-full">
            <StartNewGame />
          </div>
        </div>
        <div className="flex shrink grow basis-auto justify-center items-center relative bg-[#fae8ff]">
          <BackButton />
          <Routes>
            <Route path="/" element={<GameHistory />} />
            <Route path="/board" element={<Board />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
