"use client"
import { jwtDecode } from 'jwt-decode'
import { GetCookies } from './GetCookies';
import Cookies from 'js-cookie';


const IsAuth = () => {

    // const token = GetCookies('token');
    const token = localStorage.getItem('token');

    console.log(GetCookies('token'))
    console.log("Your token is: ");
    console.log("Your token is: ");
    console.log("Your token is: ");
    console.log("Your token is: ");
    console.log("Your token is: ");
    console.log("Your token is: ");
    console.log("Your token is: ");
    console.log("Your token is: ");
    console.log("Your token is: ");
    console.log("Your token is: ");
    console.log("Your token is: " +  token);
    console.log("Your token is: " +  token);
    console.log("Your token is: " +  token);
    console.log("Your token is: " +  token);
    console.log("Your token is: " +  token);
    console.log("Your token is: " +  token);
    console.log("Your token is: " +  token);

    if(!token){
        return false
    }

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