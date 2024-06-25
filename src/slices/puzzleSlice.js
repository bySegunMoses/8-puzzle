// puzzleSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tiles: generateInitialTiles(), // Update to generate a difficult pattern
  moves: 0,
  gameOver: false,
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
    },
    checkWin: (state) => {
      if (isSolved(state.tiles)) {
        state.gameOver = true;
      }
    },
  },
});

export const { moveTile, resetGame, checkWin } = puzzleSlice.actions;
export default puzzleSlice.reducer;

function generateInitialTiles(difficulty) {
  return [8, 7, 6, 5, 4, 3, 2, 1, 0];
}

function isSolved(tiles) {
  return tiles.every((tile, index) => tile === index);
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
