"use client";

import { usePathname , useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import IsAuth from "./utils/IsAuth";
import { decodeJwt } from "./utils/JwtDecode";
const NavBar = () => {
  const pathName = usePathname();


  const navbarHide = ["/signup", "/signin"];

  // console.log(pathName);

  const currunetPath = navbarHide.includes(pathName);
  console.log(currunetPath);
  //   currunetPath = true;

  console.log("---checking---")

  const [role , setRole] = useState<string>()

  useEffect(() => {
    if(localStorage.getItem('token')){
      const token = localStorage.getItem('token') || ""
      const tokenDetais = decodeJwt(token)
      setRole(tokenDetais.role)
      console.log(tokenDetais)
    }
  }, [currunetPath])

  console.log(role)

  return (
    <div className="z-0">
      {!currunetPath ? (
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-sm"
              >
                 <li>
                <Link href={`/cabs`}>Book Cab</Link>
              </li>
                {
                  (role == "driver" || role == "admin") && (
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
                  )
                }
            
            {
                  (role == "admin") && (
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
                  )
                }
              </ul>
            </div>
            <a className="btn btn-ghost text-xl">Mega city cab</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href={`/cabs`}>Book Cab</Link>
              </li>
                {
                  (role == "driver" || role == "admin") && (
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
                  )
                }
            
            {
                  (role == "admin") && (
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
                  )
                }
            </ul>
          </div>
          <div className="navbar-end">
            { IsAuth() ? (
              <NavbarProfile />
            ) : (
              <div>
                <Link href={`/signin`} className=" btn">Signin</Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};


const NavbarProfile =  () => {

  const router = useRouter();

  
  const logout = () => {
    
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    router.push("/signin")

}


  return (
    <div className="dropdown dropdown-end">
    <div
      tabIndex={0}
      role="button"
      className="btn btn-ghost btn-circle avatar"
    >
      <div className="w-10 rounded-full">
        <Image
          width={50}
          height = {50}
          alt="Tailwind CSS Navbar component"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        />
      </div>
    </div>
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
    >
      <li>
        <Link href={"/profile"} className="justify-between">
          Profile
          <span className="badge">New</span>
        </Link>
      </li>
      <li>
        <Link href={`/profile/mybookings`}>My Bookings</Link>
      </li>
      <li>
        <a onClick={logout}>Logout</a>
      </li>
    </ul>
  </div>
  )
}
export default NavBar;
