"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Logout = () => {

    const pathName = usePathname();

    const [logoutBtton , setLogoutButton ] = useState<boolean>(true)

    const navbarHide = ["/signin" , "/signup"];
    
    const currunetPath = pathName.includes(navbarHide);

    console.log(pathName)
   
    const router = useRouter();
    const logout = (e) => {
        e.preventDefault();
        if(localStorage.getItem("token") == null){
            setLogoutButton(false)
        }
        localStorage.removeItem('token');
        router.push("/signin")
    }

    return (
        <div>
            { logoutBtton ? (
                 <div><button className="btn " onClick={logout}>Log out</button></div>
            ) : "" }

        </div>
    )

}

export default Logout