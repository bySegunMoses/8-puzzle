import { useEffect, useState } from 'react';
import { fetchTopScores } from '../../utils/fetchStores';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const loadScores = async () => {
      const topScores = await fetchTopScores();
      setScores(topScores);
    };
    loadScores();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>{score.username}: {score.time}s</li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
