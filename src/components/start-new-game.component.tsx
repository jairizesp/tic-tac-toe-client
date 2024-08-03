import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Modal, { ModalWidthSizes } from "../utils/ui/modal.component";
import Input from "../utils/ui/input.component";
import { StartGame } from "../services/start-game.service";
import { Subscription, takeUntil } from "rxjs";
import Button from "../utils/ui/button.component";

export interface IStartNewGameProps {
  openModal: () => void;
}

export interface Players {
  player1: string;
  player2: string;
}

const StartNewGame = () => {
  const startGame = StartGame.getInstance();
  const subscriptionRef = useRef<Subscription | null>(null);
  const [modalState, setModalState] = useState<boolean>(false);
  const [players, setPlayers] = useState<Players>({ player1: "", player2: "" });

  const handleClick = () => {
    setModalState(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setPlayers((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlayerClick = () => {
    if (!players.player1 || !players.player2) return;

    startGame.setPlayers(players);
    setModalState(false);
  };

  useEffect(() => {
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, []);

  return (
    <>
      <Modal
        open={modalState}
        onClose={() => setModalState(false)}
        size={ModalWidthSizes.medium}
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
            <Button name="submit" label="Submit" onClick={handlePlayerClick} />
            {/* <button
              className="bg-[#d8b4fe] rounded-md px-4 py-2 text-slate-700 hover:bg-[#9333ea] hover:text-white active:bg-[#d8b4fe] active:text-slate-700"
              onClick={handlePlayerClick}
            >
              Submit
            </button> */}
          </div>
        </div>
      </Modal>
      <div>{modalState}</div>
      <button
        className="border border-slate-300 rounded-md p-3 text-sm text-slate-600 animate-pulse mb-52"
        onClick={handleClick}
      >
        Start New Game
      </button>
    </>
  );
};

export default StartNewGame;
