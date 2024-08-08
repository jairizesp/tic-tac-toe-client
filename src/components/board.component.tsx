import { ChangeEvent, useEffect, useState } from "react";
import Box from "./box.component";
import { IPlayers, StartGame } from "../services/start-game.service";
import Button from "../utils/ui/button.component";
import Modal, { ModalWidthSizes } from "../utils/ui/modal.component";
import Input from "../utils/ui/input.component";
import { useNavigate } from "react-router-dom";
import { GameData } from "../services/game-data.service";

const Board = () => {
  const startGame = StartGame.getInstance();
  const gameData = GameData.getInstance();
  const navigate = useNavigate();

  const [box, setBox] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isNewGame, setIsNewGame] = useState(false);
  const [gameEndModal, setGameEndModal] = useState(false);
  const [hasPlayers, setHasPlayers] = useState(false);
  const [playerModal, setPlayerModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDraw, setIsDraw] = useState(false)
  const [players, setPlayers] = useState<IPlayers>({
    player1: {
      name: "",
      wins: 0,
      losses: 0,
    },
    player2: {
      name: "",
      wins: 0,
      losses: 0,
    },
  });
  const [winner, setWinner] = useState("");

  function handleClick(i: number) {
    if (box[i] || calculateWinner(box)) {
      return;
    }
    const nextSquares = box.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    setBox(nextSquares);
    setXIsNext(!xIsNext);
  }

  function calculateWinner(box: number[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (box[a] && box[a] === box[b] && box[a] === box[c]) {
        return box[a];
      }
    }
    return null;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setPlayers((prev) => ({
      ...prev,
      //@ts-ignore
      [name]: { ...prev[name], name: value },
    }));
  };

  const handlePlayerClick = () => {
    if (!players.player1 || !players.player2) return;
    startGame.setPlayers(players);
    setPlayerModal(false);
    startGame.setNewGame(false);
  };

  useEffect(() => {
    const newGameSubscription = startGame._isNewGame.subscribe((data) => {
      console.log("IS NEW GAME:", data);
      setIsNewGame(data);
    });

    const startGameSubscription = startGame.startNewGame.subscribe((data) => {
      console.log(data);

      if (data === null) {
        setHasPlayers(false);
      } else {
        setHasPlayers(true);
        setPlayers(data);
      }
    });

    return () => {
      newGameSubscription.unsubscribe();
      startGameSubscription.unsubscribe();
    };
  }, []);

  const handleStartNewGame = () => {
    console.log("clicked!");
    if (!hasPlayers) {
      setPlayerModal(true);
    }

    startGame.setNewGame(false);
  };

  const handleStopClick = () => {
    gameData
      .saveGameData(players)
      .then((_) => {
        setIsLoading(true);
      })
      .finally(() => {
        startGame.clearPlayers();
        setIsLoading(false);
        setPlayerModal(false);
        navigate("/");
      });
  };

  useEffect(() => {
    const winner = calculateWinner(box);
    if(isDraw){
      setIsDraw(false)
    }
    if (winner) {
      setGameEndModal(true);
      let winnerPlayer = "";
      if (winner.toString() == "X") {
        winnerPlayer = players.player1.name;
        setPlayers((prev) => ({
          ...prev,
          player1: { ...prev.player1, wins: prev.player1.wins + 1 },
          player2: { ...prev.player2, losses: prev.player2.losses + 1 },
        }));
        console.log(players);
      } else {
        winnerPlayer = players.player2.name;
        setPlayers((prev) => ({
          ...prev,
          player2: { ...prev.player2, wins: prev.player2.wins + 1 },
          player1: { ...prev.player1, losses: prev.player1.losses + 1 },
        }));
        console.log(players);
      }

      setWinner(winnerPlayer);
      status = "Winner: " + winner;
    } else {
      const draw = box.every(square => square !== null)
      if(draw){
        setIsDraw(draw)
         setGameEndModal(true);
      }
     
      status = "Next player: " + (xIsNext ? "X" : "O");
    }
  }, [xIsNext]);

  const handleContinue = () => {
    setBox([]);
    setBox(Array(9).fill(null));
    setGameEndModal(false);
  };

  return (
    <>
      {hasPlayers ? (
        isNewGame ? (
          <>
            <Button
              name="new-game"
              label="Start Game"
              onClick={handleStartNewGame}
            />

            <Modal
              open={playerModal}
              onClose={() => setPlayerModal(false)}
              size={ModalWidthSizes.medium}
            >
              <div className="flex flex-col gap-8">
                <p className="font-medium text-slate-600">Player Information</p>
                <div className="flex flex-col gap-4">
                  <Input
                    key="player-1"
                    type="text"
                    placeholder="Player 1 name"
                    name="player1"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      handleChange(event)
                    }
                  />
                  <Input
                    key="player-2"
                    type="text"
                    placeholder="Player 2 name"
                    name="player2"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      handleChange(event)
                    }
                  />
                </div>

                <div className="w-full flex justify-end">
                  <Button
                    name="submit"
                    label="Submit"
                    onClick={handlePlayerClick}
                  />
                </div>
              </div>
            </Modal>
          </>
        ) : (
          <div className="flex flex-col gap-8">
            <Modal
              key="game-end-modal"
              open={gameEndModal}
              onClose={() => setGameEndModal(false)}
            >
              <div className="flex flex-col gap-4">
                {isDraw ?  <h1>
                  <span className="font-semibold text-slate-600">DRAW</span>
                </h1> :  <h1>
                  <span className="font-semibold text-[#9333ea]">{winner}</span>{" "}
                  won!
                </h1>}
                <Button
                  key="stop-game-btn"
                  label="Stop"
                  name="stop"
                  isLoading={isLoading}
                  classNames="bg-[#fecdd3] text-[#e11d48]"
                  onClick={handleStopClick}
                />

                <Button
                  key="continue-game-btn"
                  isLoading={isLoading}
                  label="Continue"
                  name="continue"
                  onClick={handleContinue}
                />
              </div>
            </Modal>
            <div className="flex flex-col gap-8 text-sm w-full p-2 rounded-md bg-[#e9d5ff] text-slate-600">
              <div className="[&>*>span]:font-semibold">
                <p>
                  Name: <span>{players.player1.name}</span>
                </p>
                <p>
                  Wins: <span>{players.player1.wins}</span>
                </p>
                <p>
                  Losses: <span>{players.player1.losses}</span>
                </p>
              </div>
              <div className="[&>*>span]:font-semibold">
                <p>
                  Name: <span>{players.player2.name}</span>
                </p>
                <p>
                  Wins: <span>{players.player2.wins}</span>
                </p>
                <p>
                  Losses: <span>{players.player2.losses}</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col w-[300px] h-[300px] [&>div:not(:last-child)>*]:border-b-0">
              <div className="flex w-full shrink grow basis-auto">
                <Box value={box[0]} click={() => handleClick(0)} />
                <Box value={box[1]} click={() => handleClick(1)} />
                <Box value={box[2]} click={() => handleClick(2)} />
              </div>
              <div className="flex shrink grow basis-auto">
                <Box value={box[3]} click={() => handleClick(3)} />
                <Box value={box[4]} click={() => handleClick(4)} />
                <Box value={box[5]} click={() => handleClick(5)} />
              </div>
              <div className="flex shrink grow basis-auto">
                <Box value={box[6]} click={() => handleClick(6)} />
                <Box value={box[7]} click={() => handleClick(7)} />
                <Box value={box[8]} click={() => handleClick(8)} />
              </div>
            </div>
          </div>
        )
      ) : (
        <>
          <Button
            name="new-game"
            label="Start Game"
            classNames="animate-pulse border-2 border-[#a21caf] text-[#a21caf] font-medium hover:border-2 hover:border-[#9333ea]"
            onClick={handleStartNewGame}
          />

          <Modal
            open={playerModal}
            onClose={() => setPlayerModal(false)}
            size={ModalWidthSizes.medium}
            hasCloseButton={true}
          >
            <div className="flex flex-col gap-8">
              <p className="font-medium text-slate-600">Player Information</p>
              <div className="flex flex-col gap-4">
                <Input
                  type="text"
                  placeholder="Player 1 name"
                  name="player1"
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleChange(event)
                  }
                />
                <Input
                  type="text"
                  placeholder="Player 2 name"
                  name="player2"
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleChange(event)
                  }
                />
              </div>

              <div className="w-full flex justify-end">
                <Button
                  name="submit"
                  label="Submit"
                  onClick={handlePlayerClick}
                />
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default Board;
