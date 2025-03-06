import { jwtDecode } from 'jwt-decode';

interface TokenObject {
    id:string
    sub : string,
    exp : string,
    role : string
    email:string
}

export const decodeJwt= (token:string) => {
    return jwtDecode<TokenObject>(token);
}

