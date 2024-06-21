import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export const saveScore = async (username, time) => {
  try {
    await addDoc(collection(db, 'leaderboard'), {
      username,
      time,
      date: new Date(),
    });
  } catch (error) {
    console.error('Error adding score: ', error);
  }
};

export const fetchTopScores = async () => {
  const q = query(collection(db, 'leaderboard'), orderBy('time'), limit(10));
  const querySnapshot = await getDocs(q);
  const scores = [];
  querySnapshot.forEach((doc) => {
    scores.push(doc.data());
  });
  return scores;
};
