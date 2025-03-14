"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import IsAuth from './IsAuth';

const WithAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();
    const isAuthenticated = IsAuth();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/signin");
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default WithAuth;