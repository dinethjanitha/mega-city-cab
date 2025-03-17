"use client";

import { usePathname } from "next/navigation";
// import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
// import IsAuth from "./utils/IsAuth";
import { decodeJwt } from "./utils/JwtDecode";
import { useCookies } from "next-client-cookies";
import IsAuth from "./utils/IsAuth";

const NavbarProfile = dynamic(() => import("./NavbarProfile"), { ssr: false });

const NavBar = () => {
  const cookies = useCookies();
  const auth = IsAuth();
  const pathName = usePathname();


  const authcheck = (cookies.get('token')?.toString().length ?? 0) > 5;

  console.log("authcheck")
  console.log(authcheck)

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

  const isActive = (path: string) => pathName === path ? "btn border-0" : "";

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
                <li>
                  <Link href={`/cabs`}>Our services</Link>
                </li>
                <li>
                  <Link href={`/cabs`}>Contact Us</Link>
                </li>
                <li>
                  <Link href={`/cabs`}>About Us</Link>
                </li>
                <li>
                  <Link href={`/guide/faq`}>Guide</Link>
                </li>
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
                )}
              </ul>
            </div>
            <Link href={"/"} className="btn btn-ghost text-xl">Mega City Cab</Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link id="cabs" href={`/cabs`} className={isActive("/cabs")}>Book Cab</Link>
              </li>
              <li>
                <Link id="services" href={`/cabs`} className={isActive("/services")}>Our services</Link>
              </li>
              <li>
                <Link id="" href={`/cabs`}>Contact Us</Link>
              </li>
              <li>
                <Link id="" href={`/cabs`}>About Us</Link>
              </li>
              <li>
                <Link id="" href={`/guide/faq`} className={isActive("/guide/faq")}>Guide</Link>
              </li>
              {(role === "driver" || role === "admin") && (
                <li>
                  <details>
                    <summary className={isActive("/driver/bookings")}>Driver</summary>
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
              )}
            </ul>
          </div>
          <div className="navbar-end">
              <div>
                { auth ? (
                <div>
                  <NavbarProfile />
                </div>
              ) : (
                <div>
                  <Link href={`/signin`} className="btn">Signin</Link>
                </div>
              )}
              </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default NavBar;