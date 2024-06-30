// puzzleSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tiles: generateInitialTiles(),
  moves: 0,
  gameOver: false,
  timer: { minutes: 0, seconds: 0, milliseconds: 0 }, // Ensure timer is initialized
  timerActive: false,
};

const puzzleSlice = createSlice({
  name: 'puzzle',
  initialState,
  reducers: {
    moveTile: (state, action) => {
      const tileIndex = action.payload;
      const emptyIndex = state.tiles.indexOf(0);
      if (isAdjacent(tileIndex, emptyIndex)) {
        [state.tiles[tileIndex], state.tiles[emptyIndex]] = [state.tiles[emptyIndex], state.tiles[tileIndex]];
        state.moves += 1;
      }
    },
    resetGame: (state, action) => {
      state.tiles = generateInitialTiles(action.payload);
      state.moves = 0;
      state.gameOver = false;
      state.timer = { minutes: 0, seconds: 0, milliseconds: 0 }; // Reset timer on game reset
      state.timerActive = true;
    },
    checkWin: (state) => {
      if (isSolved(state.tiles)) {
        state.gameOver = true;
        state.timerActive = false;
      }
    },
    setTimer: (state, action) => {
      state.timer = action.payload;
    },
    setTimerActive: (state, action) => {
      state.timerActive = action.payload;
    }
  },
});

export const { moveTile, resetGame, checkWin, setTimer, setTimerActive } = puzzleSlice.actions;
export default puzzleSlice.reducer;

function generateInitialTiles(difficulty) {
  return [8, 6, 7, 2, 5, 4, 3, 0, 1];
}

function isSolved(tiles) {
  const solvedTiles = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  return tiles.every((tile, index) => tile === solvedTiles[index]);
}

function isAdjacent(index1, index2) {
  const rowSize = 3;
  const row1 = Math.floor(index1 / rowSize);
  const col1 = index1 % rowSize;
  const row2 = Math.floor(index2 / rowSize);
  const col2 = index2 % rowSize;

  return (
    (row1 === row2 && Math.abs(col1 - col2) === 1) ||
    (col1 === col2 && Math.abs(row1 - row2) === 1)
  );
}
