import Square from './Square';
import { calculateWinner } from '../utils/gameLogic';

export default function Board({ onPlay, turn1IsNext, squares }) {
    const result = calculateWinner(squares);
    const winningLine = result?.line || [];


    function handleClick(i) {
        if (calculateWinner(squares) || squares[i] !== "?") {
            return;
        }
        const nextSquares = squares.slice();
        nextSquares[i] = turn1IsNext ? "1" : "2";
        onPlay(nextSquares);
    }

    return (
        <div className='board'>
            {
                squares.map((square, index) => (
                    <Square key={index} value={square} onSquareClick={() => handleClick(index)} isWinningSquare={winningLine.includes(index)} />
                ))
            }
        </div>
    );
}



