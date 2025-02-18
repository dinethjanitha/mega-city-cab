import { jwtDecode } from 'jwt-decode'

const IsAuth = () => {
    const token = localStorage.getItem('token')
    console.log("Your token is: " +  token);

    if(!token){
        return false
    }

    try{
        const decode = jwtDecode(token);
        const currentTime = Date.now() / 1000
        console.log(currentTime);

        if(decode.exp == null){
            return false;
        }

        return decode.exp > currentTime;
    }catch{
        return false
    }


  
}

export default IsAuth