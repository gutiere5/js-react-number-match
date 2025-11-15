import './App.css';


function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board() {
  return (
    <div className="game-container">
      <div className="board-row">
        <Square value="?" onSquareClick={() => {}} />
        <Square value="?" onSquareClick={() => {}} />
        <Square value="?" onSquareClick={() => {}} />
      </div>
      <div className="board-row">
        <Square value="?" onSquareClick={() => {}} />
        <Square value="?" onSquareClick={() => {}} />
        <Square value="?" onSquareClick={() => {}} />
      </div>
      <div className="board-row">
        <Square value="?" onSquareClick={() => {}} />
        <Square value="?" onSquareClick={() => {}} />
        <Square value="?" onSquareClick={() => {}} />
      </div>
    </div>
  );
}

export default Board;
