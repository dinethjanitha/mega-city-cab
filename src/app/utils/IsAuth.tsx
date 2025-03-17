"use client"
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react';

const IsAuth = () => {

    const [token , setToken] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);
    },[])

    if(!token){
        return false
    }

    console.log("token")
    console.log(token)

    try{
        const decode = jwtDecode(token);
        const currentTime = Date.now() / 1000
        console.log(currentTime);

        if(decode.exp == null){
            // localStorage.setItem('username' , );
            return false;
        }

        return decode.exp > currentTime;
    }catch{
        return false
    }


  
}

export default IsAuth