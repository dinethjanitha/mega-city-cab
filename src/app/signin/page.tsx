"use client";
import axios from "axios";


import { decodeJwt } from "../utils/JwtDecode";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean | null>(null);
  const [success, setSuccess] = useState<boolean>(false);


 

  let sk:string  = "";
  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleButton = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

  

    try {
      const response = await axios.post("http://localhost:3005/api/v1/auth", {
        username: username,
        password: password,
      });

      console.log(response.data);
      setError(false)
      setSuccess(true);

      
      sk = response.data;
      localStorage.setItem('token' , sk)
      // console.log(sk)
      
       try{
          const decode = decodeJwt(sk);

          // console.log(decode.sub)

          localStorage.setItem('id' , decode.id)

          if(decode.role == "ADMIN"){
            console.log("ADMIN User");
          }

          console.log(decode);
       }catch(e : unknown){
          console.log(e)
          throw new Error("Erorr!");
       }

        // router.push("/admin/manageusers");
       //
     
       
     } catch (e : unknown ) {
      setSuccess(false)
      setError(true)
      console.log("Error!");
      console.log(e);
    }

   
  };



  
  

  //console.log(password);
  //console.log(username);

  return (
    <div className=" h-screen w-screen flex justify-center items-center">
      <form action="#">
        <div className="flex flex-col gap-3 w-[500px] shadow-xl p-6 rounded-xl">
          <span className=" text-3xl font-bold mb-3">Sign In</span>

          {success && (
            <div role="alert" className="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Login Pass!</span>
            </div>
          )}

          {error && (
            <div role="alert" className="  alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Invalid Username or Password!</span>
            </div>
          )}

          <label className="input input-bordered w-full flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              onChange={handleUsername}
              placeholder="Username"
            />
          </label>
          <label className="input input-bordered flex  w-full items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              onChange={handlePassword}
              placeholder="Password"
            />
          </label>
          <button className=" btn btn-primary" onClick={handleButton}>
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
