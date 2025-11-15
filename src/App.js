import './App.css';
import { useState } from 'react';

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill("?"));
  const [turn1IsNext, setTurnIsNext] = useState(true);

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i] !== "?") {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = turn1IsNext ? "1" : "2";
    setSquares(nextSquares);
    setTurnIsNext(!turn1IsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: Player ${winner}`;
  } else {
    status = `Next player: Player ${turn1IsNext ? "1" : "2"}`;
  }

  return (
    <div className="game-container">
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );

    function calculateWinner(squares) {
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
        const firstSquare = squares[a];
        if (firstSquare && firstSquare !== "?" && firstSquare === squares[b] && firstSquare === squares[c]) {
          return firstSquare;
        }
      } 
      return null;
  }
}