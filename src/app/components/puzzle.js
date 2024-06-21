import { useSelector, useDispatch } from 'react-redux';
import { moveTile, resetGame } from '../../slices/puzzleSlice';
import styles from '../../style/Puzzle.module.css';
import { useState, useEffect } from 'react';

const Puzzle = () => {
    const { tiles, moves } = useSelector(state => state.puzzle);
    const dispatch = useDispatch();
    const [difficulty, setDifficulty] = useState('easy'); // default difficulty
  
    const handleTileClick = (index) => {
      dispatch(moveTile(index));
    };
  
    const handleReset = () => {
      dispatch(resetGame(difficulty));
    };
  
    return (
      <div>
        <div className={styles.grid}>
          {tiles.map((tile, index) => (
            <div
              key={index}
              className={`${styles.tile} ${tile === 0 ? styles.empty : ''}`}
              onClick={() => tile !== 0 && handleTileClick(index)}
            >
              {tile !== 0 && tile}
            </div>
          ))}
        </div>
        <div className={styles.controls}>
          <select 
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button onClick={handleReset}>Reset</button>
        </div>
        <p>Moves: {moves}</p>
      </div>
    );
  };
  
  export default Puzzle;