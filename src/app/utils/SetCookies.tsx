"use server"
import { cookies } from 'next/headers'

export const SetCookies = async (name:string , value:string ,exptime:number) => {
    
    const cookiesAccess = await cookies();

    cookiesAccess.set(name , value , {
   
    })

    console.log("cookie set done")
    console.log(cookiesAccess.get(name)?.value)
}
