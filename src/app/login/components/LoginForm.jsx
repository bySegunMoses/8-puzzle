"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { auth, db } from '../../../../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../../../slices/userSlice';
import { Input, Button, Spacer } from '@nextui-org/react';
import { doc, getDocs, query, where, collection } from 'firebase/firestore';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setError('Please verify your email before logging in.');
        setLoading(false);
        return;
      }

      // Fetch username from Firestore using email
      const usersRef = collection(db, 'Users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data(); // Get the first matching document
        dispatch(setUser({
          email: user.email,
          userId: user.uid,
          username: userData.username, // Use username from Firestore
        }));

        router.push('/dashboard');
      } else {
        setError('User data not found.'); // Handle case where user data is missing
      }
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found':
          setError('No user found with this email.');
          break;
        case 'auth/invalid-credential':
          setError('No user found with this email.');
          break
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email format. Please enter a valid email.');
          break;
        case 'auth/too-many-requests':
          setError('Too many login attempts. Please try again later.');
          break;
        default:
          setError('An error occurred. Please try again.');
      }
    }

    setLoading(false);
  };

  return (
    <form className='bg-white border-2 border-gray-300 rounded-xl p-6' onSubmit={handleLogin}>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold'>Login</h1>
        <p className='text-sm text-gray-600'>Enter your email and password to log in.</p>
      </div>

      {/* Email Input */}
      <Input
        type="email"
        label="Email"
        placeholder="my.email@mail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        classNames={{ background: 'bg-white' }}
      />

      {/* Password Input */}
      <Input
        type="password"
        label="Password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="mb-4"
      />

      {/* Error Message */}
      {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

      {/* Login Button */}
      <Button
        color="primary"
        type="submit"
        onPress={handleLogin}
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>

      <Spacer y={1} />

      {/* Don't Have an Account */}
      <p className='text-center text-sm mt-4'>
        Don't have an account? <a href="/signup" className='text-blue-500'>Sign Up</a>
      </p>
    </form>
  );
};

export default LoginForm;
