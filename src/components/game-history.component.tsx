import { useEffect, useState } from "react";
import trophy from "../assets/trophy.svg";
import { GameData } from "../services/game-data.service";
import { IPlayers } from "../services/start-game.service";
import Spinner from "../utils/ui/spinner.component";

const GameHistory = () => {
  const game = GameData.getInstance();

  const [games, setGames] = useState<IPlayers[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    game
      .getGameHistory()
      .then((games) => {
        setIsLoading(true);
        //@ts-ignore
        setGames(games.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col  w-full h-full justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col  w-full h-full px-8 py-8 overflow-auto gap-6 ">
          <div className="w-full sticky -top-8 pt-4  bg-[#fae8ff]">
            <h1 className="text-2xl font-bold text-slate-700 ">Game History</h1>
          </div>
          {games?.length
            ? games.map((games, idx) => (
                <div key={idx} className="text-slate-600 ">
                  {games.player1.wins === games.player2.wins ? (
                    <h1 className="text-xl text-slate-400 font-bold">DRAW</h1>
                  ) : (
                    <h1 className="text-xl font-bold">
                      Winner: &nbsp;
                      {games.player1.wins > games.player2.wins
                        ? games.player1.name
                        : games.player2.name}
                    </h1>
                  )}
                  <p>
                    <span className="font-medium">Player 1:</span>
                    <span
                      className={`${
                        games.player1.wins > games.player2.wins
                          ? "text-green-500"
                          : games.player1.wins < games.player2.wins
                          ? "text-red-400"
                          : "text-slate-400"
                      } font-medium`}
                    >
                      &nbsp; {games.player1.name}
                    </span>
                    &nbsp;
                    {games.player1.wins > games.player2.wins ? (
                      <img
                        className="w-6 h-6 inline-block pb-1"
                        src={trophy}
                        alt=""
                      />
                    ) : null}
                    <span className="[&>*]:ml-4 text-xs [&>*]:block">
                      <span>Wins: {games.player1.wins}</span>
                      <span>Losses: {games.player1.losses}</span>
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Player 2:</span>
                    <span
                      className={`${
                        games.player2.wins > games.player1.wins
                          ? "text-green-500"
                          : games.player2.wins < games.player1.wins
                          ? "text-red-400"
                          : "text-slate-400"
                      } font-medium`}
                    >
                      &nbsp; {games.player2.name}
                    </span>
                    &nbsp;
                    {games.player2.wins > games.player1.wins ? (
                      <img
                        className="w-6 h-6 inline-block pb-1"
                        src={trophy}
                        alt=""
                      />
                    ) : null}
                    <span className="[&>*]:ml-4 text-xs [&>*]:block">
                      <span>Wins: {games.player2.wins}</span>
                      <span>Losses: {games.player2.losses}</span>
                    </span>
                  </p>
                </div>
              ))
            : "No Games Found."}
        </div>
      )}
    </>
  );
};

export default GameHistory;
