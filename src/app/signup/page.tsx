"use client";
import React, { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import axios from "axios";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);
  const [errorName, SetErrorName] = useState<string>("");

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
    email: "",
    nic: "",
    gender: "",
    address: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((preData) => ({
      ...preData,
      [name]: value,
    }));
  };

  console.log(formData);

  const togalPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

//   interface RequiredFeildInterface {
//     name: {
//       length: number;
//     };
//     password: {
//       length: number;
//     };
//     username: {
//       length: number;
//     };
//     nic: {
//       length: number;
//     };
//     gender: {
//       length: number;
//     };
//     email: {
//       length: number;
//     };
//   }

//   const requiredFeild: RequiredFeildInterface = {
//     name: { length: 5 },
//     username: { length: 5 },
//     password: { length: 5 },
//     email: { length: 5 },
//     nic: { length: 5 },
//     gender: { length: 3 },
//   };

//   const checkFormData = () => {};



  const ErrorMessage = (message: string) => {
    return (
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
        <span>{message}</span>
      </div>
    );
  };

  const handleButton = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    

    try {
      const response = await axios.post("http://localhost:3005/api/v1/user", {
        name: formData.name,
        nic: formData.nic,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        address: formData.address,
        role: "USER",
        gender: formData.gender,
      });

      console.log(response.data);
      setError(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response) {
        console.log(e.response.data);
        SetErrorName(e.response.data);
      } else {
        console.error(e);
      }
      setError(true);
      // throw new Error("Error!");
    }
  };

  return (
    <form action="">
      <div className=" h-screen w-screen flex justify-center items-center">
        <div className=" flex flex-col gap-3 shadow-xl p-6 rounded-xl">
          <div>
            <span className=" text-3xl font-bold">Registration</span>
          </div>
          {error && ErrorMessage(errorName)}
          <div className=" grid grid-cols-2 w-[700] gap-3">
            <div>
              <label className="input input-bordered flex items-center gap-2">
                Name *
                <input
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  className="grow"
                  placeholder="Bob"
                  required
                />
              </label>
            </div>
            <div>
              <label className="input input-bordered flex items-center gap-2">
                Email
                <input
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  className="grow"
                  placeholder="user@mail.com"
                  required
                />
              </label>
            </div>

            <div>
              <label className="input input-bordered flex items-center gap-2">
                Username
                <input
                  type="text"
                  name="username"
                  onChange={handleInputChange}
                  className="grow"
                  placeholder="0xBob"
                  required
                />
              </label>
            </div>
            <div>
              <label className="input input-bordered flex items-center gap-2">
                Password
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleInputChange}
                  className="grow"
                  required
                />
                {showPassword ? (
                  <IoEye onClick={togalPassword} />
                ) : (
                  <IoMdEyeOff className="" onClick={togalPassword} />
                )}
              </label>
            </div>

            <div>
              <label className="input input-bordered flex items-center gap-2">
                NIC
                <input
                  name="nic"
                  type="text"
                  onChange={handleInputChange}
                  className="grow"
                  placeholder="20032345656"
                  required
                />
              </label>
            </div>
            <div>
              <label className="input input-bordered flex items-center gap-2">
                Address
                <input
                  name="address"
                  type="email"
                  onChange={handleInputChange}
                  className="grow"
                  placeholder="No.23,Matara"
                  required
                />
              </label>
            </div>

            <div>
              <select
                name="gender"
                onChange={handleInputChange}
                className="select select-bordered w-full"
                required
              >
                <option value={"false"}>Gender</option>
                <option value={"male"}>Male</option>
                <option value={"female"}>Female</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            onClick={handleButton}
            className=" btn btn-primary"
          >
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
