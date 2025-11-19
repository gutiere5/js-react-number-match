import './App.css';
import { useState } from 'react';
import { motion } from 'motion/react';

function Square({ value, onSquareClick, isWinningSquare }) {
  return (
    <motion.button
      whileHover={{ scale: value === "?" ? 1.05 : 1 }}
      whileTap={{ scale: value === "?" ? 0.95 : 1 }}
      onClick={onSquareClick}
      className={`square ${isWinningSquare ? 'winning' : ''} ${value !== "?" ? 'filled' : ''}`}
    >
      {value === "1" && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="player-1"
        >
          1
        </motion.div>
      )}
      {value === "2" && (
        <motion.div
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="player-2"
        >
          2
        </motion.div>
      )}
    </motion.button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill("?"));
  const [turn1IsNext, setTurnIsNext] = useState(true);

  function handleClick(i) {
    if (calculateWinner(squares)?.winner || squares[i] !== "?") {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = turn1IsNext ? "1" : "2";
    setSquares(nextSquares);
    setTurnIsNext(!turn1IsNext);
  }

  function handleReset() {
    setSquares(Array(9).fill("?"));
    setTurnIsNext(true);
  }

  const result = calculateWinner(squares);
  const winner = result?.winner;
  const winningLine = result?.line || [];
  const isDraw = !winner && squares.every(square => square !== "?");

  return (
    <div className="game-container">
      <div className="game-card">
        <div className="game-content">
          {/* Header */}
          <div className="header">
            <h1 className="title">3X3 Game</h1>
            <div className="players-container">
              <div className={`player-badge ${turn1IsNext && !winner && !isDraw ? 'active player1' : ''}`}>
                <span>Player 1</span>
              </div>
              <span className="vs-text">vs</span>
              <div className={`player-badge ${!turn1IsNext && !winner && !isDraw ? 'active player2' : ''}`}>
                <span>Player 2</span>
              </div>
            </div>
          </div>

          {/* Status */}
          <motion.div
            key={winner || isDraw ? 'game-over' : 'playing'}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="status-container"
          >
            {winner ? (
              <div className="status-message winner-message">
                <span className="trophy">🏆</span>
                <span>Player {winner} Wins!</span>
              </div>
            ) : isDraw ? (
              <div className="status-message draw-message">
                It's a Draw!
              </div>
            ) : (
              <div className="status-message">
                {turn1IsNext ? (
                  <>
                    <span className="turn-text player1-turn">Player 1's Turn</span>
                  </>
                ) : (
                  <>
                    <span className="turn-text player2-turn">Player 2's Turn</span>
                  </>
                )}
              </div>
            )}
          </motion.div>

          {/* Game Board */}
          <div className='board'>
            {squares.map((square, index) => (
              <Square key={index} value={square} onSquareClick={() => handleClick(index)} isWinningSquare={winningLine.includes(index)} />
            ))}
          </div>

          {/* Reset Button */}
          <button onClick={handleReset} className='reset-button'>
            <span className='reset-icon'>↻</span>
            New Game
          </button>
        </div>
      </div>
    </div >
  );
}

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
      return { winner: firstSquare, line: lines[i] };
    }
  }
  return null;
}
