export function calculateWinner(squares) {
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

export function calculateDraw(squares) {
    return !calculateWinner(squares) && squares.every(square => square !== "?");
}