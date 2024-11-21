/******************************************************
 * File Name: App.js
 *
 * Description:
 * This file implements the Tic-Tac-Toe game using React.
 * It includes all components and logic required to play the game,
 * manage game state, display the board, and track game history.
 * Key features include highlighting the winning squares,
 * displaying move history with locations, and toggling move order.
 *
 *
 * Purpose:
 * To provide a fully interactive Tic-Tac-Toe game with advanced
 * features such as move history, state management, and dynamic UI updates.
 * This serves as a working and fun example of React concepts like components,
 * props, state, and event handling, tailored for the Metagen project.
 *
 *
 * Usage:
 * - Import this file into your React project entry point.
 * - Run the application with `npm start` to start the development server.
 * - This file integrates with CSS for styling and demonstrates
 *   scalable and maintainable code design in React.
 *
 *
 * Key Points, Ideas, and Concepts:
 * - **State Management**: Centralized game state in the `Game` component.
 * - **Reusability**: Modular components like `Square` and `Board`.
 * - **Dynamic Rendering**: Use of loops for generating the board dynamically.
 * - **Conditional Rendering**: Highlighting winning squares, move tracking.
 * - **Flexibility**: Reset functionality and move ordering toggling.
 * - **Event Handling**: Click events for gameplay and UI interactions.
 * - **Clean Architecture**: Separation of concerns into individual components.
 *
 *
 * Key Technical Code Components:
 * 1. **Square Component**:
 *    - Renders individual squares with optional highlighting for winners.
 *    - Props: `value`, `onSquareClick`, `highlight`.
 *
 * 2. **Board Component**:
 *    - Generates a 3x3 grid dynamically.
 *    - Determines game status (e.g., next player, winner, or draw).
 *    - Delegates square rendering and click handling.
 *
 * 3. **Game Component**:
 *    - Manages history, current state, and move order.
 *    - Handles reset and replay functionalities.
 *    - Integrates components to render the complete game.
 *
 * 4. **calculateWinner Function**:
 *    - Identifies the winner and the winning line.
 *    - Returns both the winner and indices of winning squares.
 *
 * 5. **Reset and Sorting Features**:
 *    - Reset clears game state to start a new game.
 *    - Sorting toggles the order of the move history list.
 *
 *
 * Implementation Details:
 * - **Square Component**: A functional component with props for value,
 *   click handler, and highlight logic.
 *
 * - **Board Component**: Dynamically generates rows and columns using loops.
 *   Integrates `Square` components and manages click events.
 *
 * - **Game Component**:
 *   - Tracks the game state using React hooks (`useState`).
 *   - Handles history manipulation and state transitions.
 *   - Implements "Sort Descending" and "Replay" functionality.
 *
 * - **CSS Integration**:
 *   - Styles applied through class names, including `.highlight`
 *     for winning squares and `.current-move` for the active move.
 *
 * - **State Flow**:
 *   - `Game` manages `history` and `currentMove`.
 *   - `Board` receives state as props and delegates to `Square`.
 *   - `Square` updates UI based on props.
 *
 *
 * Notes:
 * - Extendable for larger boards by modifying `boardSize` and logic.
 * - Future improvement: Implement AI for single-player mode.
 * - Performance optimized using React’s reconciliation and immutability.
 *
 *
 * Software Engineering Team Tips:
 * - Follow DRY (Don't Repeat Yourself) principles to maintain clean code.
 * - Debug state transitions using React DevTools for better insights.
 * - Use class names consistently for easier style management and debugging.
 *****************************************************/

import { useState } from "react";

function Square({ value, onSquareClick, highlight }) {
  return (
    <button
      className={`square ${highlight ? "highlight" : ""}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (winnerInfo.winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares, i);
  }

  const winnerInfo = calculateWinner(squares);
  const { winner, winningSquares } = winnerInfo;

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (squares.every(Boolean)) {
    status = "Draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const boardSize = 3; // 3x3 board
  const board = [];
  for (let row = 0; row < boardSize; row++) {
    const squaresRow = [];
    for (let col = 0; col < boardSize; col++) {
      const index = row * boardSize + col;
      squaresRow.push(
        <Square
          key={index}
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
          highlight={winningSquares && winningSquares.includes(index)}
        />
      );
    }
    board.push(
      <div key={row} className="board-row">
        {squaresRow}
      </div>
    );
  }

  return (
    <div className="board-container">
      <div className="status">{status}</div>
      {board}
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), moveLocation: null },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(nextSquares, moveIndex) {
    const row = Math.floor(moveIndex / 3) + 1;
    const col = (moveIndex % 3) + 1;
    const moveLocation = `(${row}, ${col})`;

    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, moveLocation },
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function resetGame() {
    setHistory([{ squares: Array(9).fill(null), moveLocation: null }]);
    setCurrentMove(0);
  }

  const moves = history.map((step, move) => {
    const description =
      move > 0
        ? `Go to move #${move} ${step.moveLocation || ""}`
        : `Go to game start`;

    if (move === currentMove) {
      return (
        <li key={move} className="current-move">
          <span className="current-move-text">
            You are at move #{move} {step.moveLocation || ""}
          </span>
        </li>
      );
    }

    return (
      <li key={move}>
        <button className="move-button" onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });

  const sortedMoves = isAscending ? moves : [...moves].reverse();

  return (
    <div className="page-container">
      <h1 className="game-title">Tic-Tac-Toe</h1>
      <div className="game-container">
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
          <button className="replay-button" onClick={resetGame}>
            Replay
          </button>
        </div>
        <div className="game-info">
          <button
            className="sort-button"
            onClick={() => setIsAscending(!isAscending)}
          >
            {isAscending ? "Sort Descending" : "Sort Ascending"}
          </button>
          <ol className="move-list">{sortedMoves}</ol>
        </div>
      </div>
    </div>
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningSquares: [a, b, c] };
    }
  }
  return { winner: null, winningSquares: null };
}
