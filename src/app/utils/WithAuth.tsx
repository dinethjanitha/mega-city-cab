"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import IsAuth from './IsAuth';

const WithAuth = (WrappedComponent: React.ComponentType) => {
  const Wapper = (props: React.JSX.IntrinsicAttributes) => {
    const router = useRouter();

    useEffect(() => {
        if(!IsAuth()){
            router.push("/signin");
        }
    }, [])

    if(!IsAuth()){
        return null;
    }
    return <WrappedComponent {...props}/>
  }

  return Wapper;

};

export default WithAuth;