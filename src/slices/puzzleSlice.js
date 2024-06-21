import { createSlice } from '@reduxjs/toolkit';

const initialTiles = [1, 2, 3, 4, 5, 6, 7, 8, 0]; // 0 represents the empty space

const shuffleTiles = (tiles, difficulty) => {
  const shuffled = [...tiles];
  const shuffleMoves = {
    easy: 10,
    medium: 50,
    hard: 100,
  };

  let emptyIndex = shuffled.indexOf(0);
  const gridSize = 3;
  const directions = [-1, 1, -gridSize, gridSize]; // Left, Right, Up, Down

  for (let i = 0; i < shuffleMoves[difficulty]; i++) {
    const validMoves = directions.filter(dir => {
      const newIndex = emptyIndex + dir;
      return newIndex >= 0 && newIndex < shuffled.length &&
             (Math.floor(emptyIndex / gridSize) === Math.floor(newIndex / gridSize) || 
             (emptyIndex % gridSize) === (newIndex % gridSize));
    });
    
    const move = validMoves[Math.floor(Math.random() * validMoves.length)];
    const newIndex = emptyIndex + move;
    [shuffled[emptyIndex], shuffled[newIndex]] = [shuffled[newIndex], shuffled[emptyIndex]];
    emptyIndex = newIndex;
  }
  
  return shuffled;
};

const puzzleSlice = createSlice({
  name: 'puzzle',
  initialState: {
    tiles: shuffleTiles(initialTiles, 'easy'),
    emptyIndex: 8, // Initial empty space at the end
    moves: 0,
  },
  reducers: {
    moveTile: (state, action) => {
      const tileIndex = action.payload;
      if (canMove(tileIndex, state.emptyIndex)) {
        [state.tiles[tileIndex], state.tiles[state.emptyIndex]] = 
        [state.tiles[state.emptyIndex], state.tiles[tileIndex]];
        state.emptyIndex = tileIndex;
        state.moves += 1;
      }
    },
    resetGame: (state, action) => {
      const difficulty = action.payload || 'easy';
      state.tiles = shuffleTiles(initialTiles, difficulty);
      state.emptyIndex = state.tiles.indexOf(0); // Update the empty index
      state.moves = 0;
    },
  },
});

export const { moveTile, resetGame } = puzzleSlice.actions;
export default puzzleSlice.reducer;
