import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Modal, { ModalWidthSizes } from "../utils/ui/modal.component";
import Input from "../utils/ui/input.component";
import { IPlayers, StartGame } from "../services/start-game.service";
import { Subscription, takeUntil } from "rxjs";
import Button from "../utils/ui/button.component";
import { redirect, useLocation, useNavigate } from "react-router-dom";

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

  const location = useLocation();

  const [modalState, setModalState] = useState<boolean>(false);
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

  const navigate = useNavigate();

  const handleClick = () => {
    setModalState(true);
  };

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
    setModalState(false);
    navigate("/board");
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
      {location.pathname === "/" && (
        <>
          {" "}
          <Modal
            open={modalState}
            onClose={() => setModalState(false)}
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
          <div>{modalState}</div>
          <button
            className="border-2 border-[#a21caf] rounded-md p-3 text-sm text-[#a21caf] font-medium hover:bg-[#d946ef] hover:border-none hover:text-white animate-pulse mb-52"
            onClick={handleClick}
          >
            Start New Game
          </button>
        </>
      )}
    </>
  );
};

export default StartNewGame;
