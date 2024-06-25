"use client"

import React from 'react';
import withAuth from '../utils/withAuth';
import Puzzle from '../components/puzzle';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className='bg-white'>
      <Puzzle username={user.username} userId={user.userId} />
    </div>
  );
};

export default withAuth(Dashboard);