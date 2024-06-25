// Puzzle.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { moveTile, resetGame, checkWin } from '../../slices/puzzleSlice';
import { useRouter } from 'next/navigation';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import styles from '../../style/Puzzle.module.css';

const Puzzle = () => {
  const { tiles, moves, gameOver } = useSelector(state => state.puzzle);
  const dispatch = useDispatch();
  const router = useRouter();
  const [difficulty, setDifficulty] = useState('hard'); // Default to hard for the hardest pattern
  const [timer, setTimer] = useState({ minutes: 0, seconds: 0, milliseconds: 0 });
  const [timerActive, setTimerActive] = useState(false);
  const userId = useSelector(state => state.user.userId);
  const username = useSelector(state => state.user.username);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  useEffect(() => {
    // Start the timer when the component mounts
    setTimerActive(true);
  }, []);

  useEffect(() => {
    if (gameOver) {
      setTimerActive(false);
      alert(`Congratulations! You solved the puzzle in ${timer.minutes}m ${timer.seconds}s with ${moves} moves!`);
      updateLeaderboard(userId, username, moves, timer);
    }
  }, [gameOver, moves, timer, userId, username]);

  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setTimer(prevTime => {
          let { minutes, seconds, milliseconds } = prevTime;
          milliseconds += 1;
          if (milliseconds === 100) {
            seconds += 1;
            milliseconds = 0;
          }
          if (seconds === 60) {
            minutes += 1;
            seconds = 0;
          }
          return { minutes, seconds, milliseconds };
        });
      }, 10);
    } else if (!timerActive && timer.minutes !== 0 && timer.seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const handleTileClick = useCallback((index) => {
    dispatch(moveTile(index));
    dispatch(checkWin());
  }, [dispatch]);

  const handleReset = useCallback(() => {
    setTimer({ minutes: 0, seconds: 0, milliseconds: 0 });
    dispatch(resetGame(difficulty));
    setTimerActive(true);
  }, [difficulty, dispatch]);

  // const handleSolvePuzzle = () => {
  //   dispatch(solvePuzzle());
  // };

  const handleDragStart = (e, index) => {
    dragItem.current = index;
  };

  const handleDragEnter = (e, index) => {
    dragOverItem.current = index;
  };

  const handleDrop = () => {
    if (dragItem.current !== null && dragOverItem.current !== null && isAdjacentToEmpty(dragItem.current)) {
      dispatch(moveTile(dragItem.current));
      dispatch(checkWin());
      dragItem.current = null;
      dragOverItem.current = null;
    }
  };

  const isAdjacentToEmpty = (index) => {
    const emptyIndex = tiles.indexOf(0);
    const rowSize = 3; // 3x3 grid
    const row = Math.floor(index / rowSize);
    const col = index % rowSize;
    const emptyRow = Math.floor(emptyIndex / rowSize);
    const emptyCol = emptyIndex % rowSize;

    return (
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1)
    );
  };

  const updateLeaderboard = async (userId, username, moves, time) => {
    if (!userId || !username) {
      return;
    }
    try {
      const docRef = doc(db, 'LeaderBoard', userId);
      const docSnap = await getDoc(docRef);

      const totalTime = time.minutes * 60 + time.seconds + time.milliseconds / 100;

      if (docSnap.exists()) {
        const data = docSnap.data();
        const existingTime = data.totalCompletionTime.minutes * 60 + data.totalCompletionTime.seconds + data.totalCompletionTime.milliseconds / 100;
        if (moves < data.totalMoves || (moves === data.totalMoves && totalTime < existingTime)) {
          await setDoc(docRef, {
            username,
            totalMoves: moves,
            totalCompletionTime: time,
            timestamp: new Date().toISOString()
          });
        }
      } else {
        await setDoc(docRef, {
          username,
          totalMoves: moves,
          totalCompletionTime: time,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error updating leaderboard:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#141415] text-white p-4">
      <div className="mb-4 text-center">
        <h1 className="text-3xl font-bold">8 Puzzle Game</h1>
        <p className="text-sm text-gray-400">Arrange the tiles in the correct order</p>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`w-24 h-24 flex items-center justify-center bg-gray-700 text-2xl font-bold rounded shadow cursor-pointer ${tile === 0 ? 'bg-transparent cursor-default' : 'hover:bg-gray-600'} ${isAdjacentToEmpty(index) ? 'draggable' : ''}`}
            onClick={() => tile !== 0 && handleTileClick(index)}
            draggable={isAdjacentToEmpty(index)}
            onDragStart={(e) => isAdjacentToEmpty(index) && handleDragStart(e, index)}
            onDragEnter={(e) => isAdjacentToEmpty(index) && handleDragEnter(e, index)}
            onDragEnd={handleDrop}
          >
            {tile !== 0 && tile}
          </div>
        ))}
      </div>

      <div className="mb-4">
        <div className="flex justify-between space-x-4 items-center">
          <div className="text-lg">Timer: {`${timer.minutes}:${timer.seconds}`}</div>
          <div className="text-lg">Moves: {moves}</div>
        </div>
      </div>
    </div>
  );
};

export default Puzzle;