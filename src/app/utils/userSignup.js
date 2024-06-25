// signUp.js
import { auth, db } from '../../../firebase/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

async function isUsernameUnique(username) {
    const userDoc = await getDoc(doc(db, 'Users', username));
    return !userDoc.exists();
}

async function signUpUser(email, password, username) {
    try {
        // Check if the username is unique
        const uniqueUsername = await isUsernameUnique(username);
        if (!uniqueUsername) {
            throw new Error('Username already exists. Please choose another one.');
        }

        // Create the user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Add user to Firestore
        await setDoc(doc(db, 'Users', username), {
            uid: user.uid,
            email: email,
            username: username,
        });

        // Send email verification
        await sendEmailVerification(user);

        console.log('User signed up and email verification sent.');
    } catch (error) {
        console.error('Error signing up:', error.message);
    }
}
