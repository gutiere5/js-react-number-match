import './App.css';
import { useState } from 'react';
import { motion } from 'motion/react';
import Board from './components/Board';
import { calculateDraw, calculateWinner } from './utils/gameLogic';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill("?")]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const turn1IsNext = currentMove % 2 === 0;

  const result = calculateWinner(currentSquares);
  const winner = result?.winner;
  const isDraw = calculateDraw(currentSquares);


  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  };

  const moves = history.map((squares, move) => {
    if (move === 0) return null;

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)} className='history-button'>
          {move}
        </button>
      </li>
    );
  }).filter(Boolean);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleReset() {
    setHistory([Array(9).fill("?")]);
    setCurrentMove(0);
  }

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
          <div > <Board turn1IsNext={turn1IsNext} onPlay={handlePlay} squares={currentSquares} /> </div>

          {/* Reset Button */}
          <div className="bottom-container">
            <button onClick={handleReset} className='reset-button'>
              <span className='reset-icon'>↻</span>
              New Game
            </button>
            <ol className='game-history'>
              {moves}
            </ol>
          </div>
        </div>
      </div>
    </div >
  );
}