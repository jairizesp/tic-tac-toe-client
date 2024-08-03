import { useState } from "react";
import Box from "./box.component";

const Board = () => {
  const [box, setBox] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

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

  const winner = calculateWinner(box);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="status">{status}</div>
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
    </>
  );
};

export default Board;
