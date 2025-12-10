import "./App.css";
import { useState } from "react";
import { motion } from "motion/react";
import Board from "./components/Board";
import HistoryButton from "./components/HistoryButton";
import { calculateDraw, calculateWinner } from "./utils/GameLogic";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill("?")]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const turnAIsNext = currentMove % 2 === 0;

  const result = calculateWinner(currentSquares);
  const winner = result?.winner;
  const isDraw = calculateDraw(currentSquares);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleReset() {
    setHistory([Array(9).fill("?")]);
    setCurrentMove(0);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  return (
      <div className="game-container">
        <div className="game-card">
          <div className="game-content">
            {/* Header */}
            <div className="header-container">
              <h1 className="title">Line Of Three</h1>
              <div className="players-container">
                <div
                    className={`player-badge ${
                        turnAIsNext && !winner && !isDraw ? "active playerA" : ""
                    }`}
                >
                  <div className="badge-border" />
                  <span>Player A</span>
                </div>
                <span className="vs-text">vs</span>
                <div
                    className={`player-badge ${
                        !turnAIsNext && !winner && !isDraw ? "active playerB" : ""
                    }`}
                >
                  <div className="badge-border" />
                  <span>Player B</span>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="status-container-wrapper">
              <motion.div
                  key={winner || isDraw ? "game-over" : "playing"}
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
                    <div className="status-message draw-message">It's a Draw!</div>
                ) : (
                    <div className="status-message">
                      {turnAIsNext ? (
                          <>
                      <span className="turn-text playerA-turn">
                        Player A's Turn
                      </span>
                          </>
                      ) : (
                          <>
                      <span className="turn-text playerB-turn">
                        Player B's Turn
                      </span>
                          </>
                      )}
                    </div>
                )}
              </motion.div>
            </div>

            {/* Game Board */}
            <div>
              <Board
                  turnAIsNext={turnAIsNext}
                  onPlay={handlePlay}
                  squares={currentSquares}
              />
            </div>

            {/* Reset Button */}
            <button onClick={handleReset} className="reset-button">
              <span className="reset-icon">↻</span>
              New Game
            </button>

            {/* Game History */}
            <div className="history-container scrollbar-hide">
              {history.map((_, move) => {
                if (move === 0) return null;
                return (
                    <HistoryButton
                        key={move}
                        moveNumber={move}
                        onClick={() => jumpTo(move)}
                        isActive={currentMove === move}
                    />
                );
              })}
              {history.length === 1 && (
                  <div className="history-placeholder">
                    Make a move to see history
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}