import trophy from "../assets/trophy.svg";

const dummyHistory = [
  {
    player1: {
      name: "John",
      wins: 7,
      losses: 3,
    },
    player2: {
      name: "Mark",
      wins: 4,
      losses: 7,
    },
  },
  {
    player1: {
      name: "Joseph",
      wins: 2,
      losses: 4,
    },
    player2: {
      name: "Thomas",
      wins: 4,
      losses: 3,
    },
  },
  {
    player1: {
      name: "Peter",
      wins: 6,
      losses: 1,
    },
    player2: {
      name: "Judas",
      wins: 1,
      losses: 6,
    },
  },
];

const GameHistory = () => {
  return (
    <>
      <div className="flex flex-col  w-full h-full px-8 py-8 overflow-auto gap-8 ">
        <div className="w-full sticky top-0">
          <h1 className="text-2xl font-bold text-slate-700 bg-[#e9d5ff]">
            Game History
          </h1>
        </div>
        {dummyHistory.length
          ? dummyHistory.map((games, idx) => (
              <div key={idx} className="text-slate-600 ">
                <strong>
                  Winner:{" "}
                  {games.player1.wins > games.player2.wins
                    ? games.player1.name
                    : games.player2.name}
                </strong>
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
                    <img className="w-6 h-6 inline-block" src={trophy} alt="" />
                  ) : null}
                  <span className="[&>*]:ml-4 text-xs">
                    <p>Wins: {games.player1.wins}</p>
                    <p>Losses: {games.player1.losses}</p>
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
                    <img className="w-6 h-6 inline-block" src={trophy} alt="" />
                  ) : null}
                  <span className="[&>*]:ml-4 text-xs">
                    <p>Wins: {games.player2.wins}</p>
                    <p>Losses: {games.player2.losses}</p>
                  </span>
                </p>
              </div>
            ))
          : "No Games Found."}
      </div>
    </>
  );
};

export default GameHistory;
