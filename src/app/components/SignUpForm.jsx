import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../../firebase/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc, getDoc, query, where, collection, getDocs } from 'firebase/firestore';
import { Input, Button, Spacer } from '@nextui-org/react';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [usernameValid, setUsernameValid] = useState(null);
  const [usernameCheckInProgress, setUsernameCheckInProgress] = useState(false);
  const router = useRouter();


  useEffect(() => {
    const checkUsername = async () => {
      if (!username) {
        setUsernameValid(null);
        return;
      }

      setUsernameCheckInProgress(true);

      const q = query(collection(db, 'Users'), where('username', '==', username));
      const querySnapshot = await getDocs(q);
      setUsernameValid(querySnapshot.empty);

      setUsernameCheckInProgress(false);
    };

    const debounceTimer = setTimeout(() => {
      checkUsername();
    }, 300);

    return () => clearTimeout(debounceTimer); 
  }, [username]);

  const handleSignUp = async (e) => {
    setError('');
    setLoading(true);

    try {
      // Check if the username is unique
      const q = query(collection(db, 'Users'), where('username', '==', username));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setError('Username already exists. Please choose another one.');
        setLoading(false);
        return;
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user to Firestore
      await setDoc(doc(collection(db, 'Users')), {
        uid: user.uid,
        userId: user.uid,
        email: email,
        username: username,
        emailVerified: false,
      });

      // Send email verification
      await sendEmailVerification(user);

      alert('User signed up successfully! Please check your email for verification.');

      // Navigate to the login page
      router.push('/login');
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <form className="bg-white border-2 border-gray-300 rounded-xl p-6" onSubmit={handleSignUp}>
      {/* Heading and Description */}
      <div className='mb-8'>
        <h1 className='text-2xl font-bold'>Sign Up</h1>
        <p className='text-sm text-gray-600'>Please enter your preferred email, username, and password to sign up.</p>
      </div>

      {/* Email Input */}
      <Input 
        type="email" 
        label="Email"
        placeholder="my.email@mail.com" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        required
        className="mb-4"
      />

      {/* Password Input (Corrected) */}
      <Input
        type="password"
        label="Password"
        placeholder="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="mb-4"
      />

      {/* Username Input */}
      <Input 
        type="text" 
        label="Username"
        placeholder="enter your username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        className="mb-4"
        status={usernameValid === false ? 'error' : usernameValid ? 'success' : 'default'}
        helperText={
          usernameValid === false ? 'Username is already taken.' 
          : usernameCheckInProgress ? 'Checking availability...'
          : usernameValid ? 'Username is available!'
          : ''
        }
      />

      {/* Error Message */}
      {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

      {/* Sign Up Button */}
      <Button 
        color="primary" 
        type="submit"
        onPress={handleSignUp}
        disabled={loading || !usernameValid} 
        className="w-full"
      >
        {loading ? 'Signing Up...' : 'Sign Up'}
      </Button>

      <Spacer y={1} />
    </form>
  );
};

export default SignUpForm;
