"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
// import Cookies from "js-cookie";
import { useCookies } from "next-client-cookies";
const NavbarProfile = () => {
  const router = useRouter();
  const cookies = useCookies();
  const logout = () => {

   
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    cookies.remove("token");
    router.push("/signin");
  };

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
            height={50}
            alt="Tailwind CSS Navbar component"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d"
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
  );
};

export default NavbarProfile;