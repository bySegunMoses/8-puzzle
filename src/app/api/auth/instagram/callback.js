// pages/api/auth/instagram/callback.js
import { getSession } from 'next-auth/react';
import { auth, db } from '../../../firebaseConfig';
import { signInWithCustomToken } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send('Unauthorized');
    }
    
    const { user } = session;
    const { id, username } = user;

    // Firebase custom token creation and authentication
    const customToken = await createCustomToken(id);
    await signInWithCustomToken(auth, customToken);

    // Store user in Firestore
    const userRef = doc(db, 'users', id);
    await setDoc(userRef, {
        id,
        username,
    }, { merge: true });

    res.redirect('/');
};

async function createCustomToken(uid) {
    // Implement a Firebase function to create a custom token
    // Return the custom token here
    // This requires Firebase Admin SDK setup
    // For simplicity, returning a dummy token
    return `dummy_token_for_${uid}`;
}
