"use client"

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const user = useSelector((state) => state.user);
    const router = useRouter();

    useEffect(() => {
      if (!user.isAuthenticated || !user.username) {
        router.push('/login');
      }
    }, [user, router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
