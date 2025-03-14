"use client"
import { jwtDecode } from 'jwt-decode'
// import { GetCookies } from './GetCookies';
// import Cookies from 'js-cookie';


const IsAuth = () => {

    // const token = GetCookies('token');
    // const newToken = Cookies.get('tokenC')
    // console.log(newToken)
    const token = localStorage.getItem('token');
    // const token =  Cookies.get('tokenC')?.toString();

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