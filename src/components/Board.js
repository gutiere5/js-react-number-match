import Square from "./Square";
import { calculateWinner } from "../utils/GameLogic";

export default function Board({ onPlay, turnAIsNext, squares }) {
    const result = calculateWinner(squares);
    const winningLine = result?.line || [];

    function handleClick(i) {
        if (calculateWinner(squares) || squares[i] !== "?") {
            return;
        }
        const nextSquares = squares.slice();
        nextSquares[i] = turnAIsNext ? "A" : "B";
        onPlay(nextSquares);
    }

    return (
        <div className="board">
            {squares.map((square, index) => (
                <Square
                    key={index}
                    value={square}
                    onSquareClick={() => handleClick(index)}
                    isWinningSquare={winningLine.includes(index)}
                />
            ))}
        </div>
    );
}
