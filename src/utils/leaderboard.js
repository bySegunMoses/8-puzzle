// leaderboard.js
import { db } from '../../firebase/firebase';
import { doc, setDoc, getDoc, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

export const updateLeaderboard = async (userId, username, moves, time) => {
  const docRef = doc(db, 'LeaderBoard', userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    if (moves < data.moves || (moves === data.moves && time < data.time)) {
      await setDoc(docRef, { username, moves, time });
    }
  } else {
    await setDoc(docRef, { username, moves, time });
  }
};

export const getLeaderboard = async () => {
  const q = query(collection(db, 'LeaderBoard'), orderBy('moves'), orderBy('time'), limit(10));
  const querySnapshot = await getDocs(q);
  const leaderboard = [];
  querySnapshot.forEach((doc) => {
    leaderboard.push(doc.data());
  });
  return leaderboard;
};
