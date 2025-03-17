"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { usePathname } from 'next/navigation';
import { decodeJwt } from './utils/JwtDecode';

const NavBarCus = () => {

      const pathName = usePathname();
    
      const navbarHide = ["/signup", "/signin"];
    
      const currunetPath = navbarHide.includes(pathName);
    
      const [role, setRole] = useState<string>();
    
      useEffect(() => {
        if (localStorage.getItem('token')) {
          const token = localStorage.getItem('token') || "";
          const tokenDetais = decodeJwt(token);
          setRole(tokenDetais.role);
        }
      }, [currunetPath]);

  return (
    <>
     {(role === "driver" || role === "admin") && (
                  <li>
                    <details>
                      <summary>Driver</summary>
                      <ul className="p-2 w-[150px]">
                        <li>
                          <Link href={`/driver/bookings`}>Booking list</Link>
                        </li>
                        <li>
                          <Link href={`/driver/addcabs`}>Add Cab</Link>
                        </li>
                        <li>
                          <Link href={`/driver/mycabs`}>My Cabs</Link>
                        </li>
                      </ul>
                    </details>
                  </li>
                )}
                {role === "admin" && (
                  <li>
                    <details>
                      <summary>Admin</summary>
                      <ul className="p-2 w-[150px]">
                        <li>
                          <Link href={`/admin/manageusers`}>Manage Users</Link>
                        </li>
                        <li>
                          <Link href={`/driver/bookings`}>Add Cabs</Link>
                        </li>
                        <li>
                          <Link href={`/driver/bookings`}>Manage Booking</Link>
                        </li>
                        <li>
                          <Link href={`/driver/bookings`}>Add Users</Link>
                        </li>
                      </ul>
                    </details>
                  </li>
                )}</>
  )
}

export default NavBarCus