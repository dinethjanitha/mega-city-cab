import Cookies from 'js-cookie';

export const GetCookies = (cookieName: string): string | undefined => {
    return Cookies.get(cookieName);
}