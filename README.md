# 🎮 React Tic-Tac-Toe Game

## 📂 Project Overview

This repository contains a **React Tic-Tac-Toe** game, illustrating core React concepts like **state management**, **component-based architecture**, and **dynamic UI rendering**. This project is part of the **Metagen project** and emphasizes modular, maintainable, and scalable React development practices.

---

## 📋 Features

- 🛠️ **Dynamic Board Rendering**: Generates a 3x3 grid dynamically using loops.
- 🏆 **Winning Highlights**: Highlights the winning squares when a player wins.
- 📜 **Move History**: Displays move history with clickable links to navigate through past moves.
- ↕️ **Move Sorting**: Allows sorting the move history in ascending or descending order.
- 🔄 **Replay Button**: Resets the game to the initial state for replay.
- 🚀 **Responsive Design**: Fully responsive, compatible with various screen sizes.

---

## 📚 File Structure

# 💡 Key Features and Concepts

## 🛠️ Components

### Square Component:

- **Purpose**: Renders individual squares on the board and applies visual highlights for winning squares.
- **Props**:
  - `value`: The content of the square (`X`, `O`, or `null`).
  - `onSquareClick`: A click handler function for updating the game state.
  - `highlight`: A boolean indicating if the square is part of the winning line.

### Board Component:

- **Responsibilities**:
  - Manages the 3x3 grid of squares dynamically.
  - Handles game logic such as:
    - Determining the winner.
    - Displaying game status (e.g., Next Player, Winner, or Draw).
  - Delegates individual square rendering and click handling to the `Square` component.

### Game Component:

- **Responsibilities**:
  - Tracks:
    - Move history.
    - Current state.
    - Player turns.
  - Implements core features:
    - Navigation through move history.
    - Sorting move history (ascending/descending).
    - Resetting the game for replay.

---

## ⚙️ Game Logic

### Winning Calculation:

- **Function**: `calculateWinner`
  - Determines if a player has won.
  - Identifies the winning line (three squares in a row, column, or diagonal).
  - Supports draw detection when all squares are filled without a winner.

### State Management:

- **Hook**: `useState`
  - Manages:
    - **Move History**: Stores snapshots of the board after each move.
    - **Current Move**: Tracks the currently active move in history.
    - **Game State**: Determines the current state of the game (ongoing, draw, or winner).

---

## 🎨 Styling

### CSS Styling:

- **Global Styles**: Defined in `styles.css`.
- **Key Classes**:
  - `.square`: Styles for individual squares.
  - `.highlight`: Visual effect applied to squares forming the winning line.
  - `.current-move`: Highlights the currently active move in the move history.
  - `.replay-button`: Styles for the reset button.

---

## 🧪 Testing

### Verify Basic Gameplay:

1. Ensure players can alternate turns.
2. Confirm accurate winner detection and draw handling.

### Test Move History Navigation:

1. Validate navigation between past moves.
2. Ensure the current move is correctly highlighted.

### Validate UI Features:

1. Check visual highlighting of winning squares.
2. Confirm proper sorting functionality of the move history.

---

## ✨ Enhancements for Future Development

- 🤖 **AI Player**: Add an AI opponent for single-player gameplay.
- 🧩 **Dynamic Board Sizes**: Allow customization of the board dimensions (e.g., 4x4 or 5x5 grids).
- 🌐 **Multiplayer Support**: Enable online multiplayer functionality using WebSockets or Firebase.
- 🎨 **Custom Themes**: Allow users to choose or design themes for the game.
- 📱 **Mobile Optimization**: Enhance touch interactions for better gameplay on mobile devices.

---

## 📜 Licensing

This project is licensed under the **MIT License**. For more details, see the `LICENSE` file included with this project.
