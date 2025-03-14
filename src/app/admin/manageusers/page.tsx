"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";
import { useCookies } from "next-client-cookies";
interface User {
  id: string;
  name: string;
  nic: string;
  gender: string;
  address: string;
  password: string;
  email: string;
  username: string;
  role: string;
}

const ManageUsers: React.FC = () => {

  const cookies = useCookies();

  const [users, setUsers] = useState<User[] | null>(null);
  const [formData, setFormData] = useState<User>({
    id: "",
    name: "",
    nic: "",
    gender: "",
    address: "",
    password: "",
    email: "",
    username: "",
    role: "",
  });

  const [searchData, setSearchData] = useState<User[] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleEditButton = (user: User) => {
    setFormData({
      id: user.id,
      name: user.name,
      nic: user.nic,
      gender: user.gender,
      address: user.address,
      password: user.password,
      email: user.email,
      username: user.username,
      role: user.role,
    });
    setShowModal(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((preData) => ({
      ...preData,
      [name]: value,
    }));
  };

  const handleSaveButton = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // const token = localStorage.getItem("token");
      const token = cookies.get('token')?.toString();
      const response = await axios.put(
        "http://localhost:3005/api/v1/user",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response)
      if (users) {
        setUsers(
          users.map((user) => (user.id === formData.id ? formData : user))
        );
      }

      setShowModal(false);
      setSuccessMessage("User updated successfully!");
      fetchUsers();
      setTimeout(() => setSuccessMessage(""), 3000); // Hide the success message after 3 seconds
    } catch (e: unknown) {
      console.log(e);
    }
  };

  const fetchUsers = async () => {
    try {
      // const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const token = cookies.get('token')?.toString();
      // Retrieve the token from localStorage
      const response = await axios.get("http://localhost:3005/api/v1/users", {
        headers: {
          Authorization: `Bearer ${token}`, // Add the Bearer token to the request headers
        },
      });
      setUsers(response.data);
      setSearchData(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const searchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const typing = e.target.value;

    if (typing !== "") {
      const data = users?.filter((user) => {
        if (
          user.id.includes(typing) ||
          user.email.includes(typing) ||
          user.role.includes(typing) ||
          user.nic.includes(typing)
        ) {
          return user;
        }
      });

      setSearchData(data || null);
    } else {
      setSearchData(users);
    }
  };

  
 

  return (
    <div className="p-10">
      <div className="overflow-x-auto">
        <h2 className=" text-2xl my-3">User Details</h2>
        <label className="input m-3">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            onChange={searchUser}
            placeholder="Search"
          />
        </label>
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>NIC</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchData == null
              ? users?.map((user) => (
                  <tr key={user.id}>
                    <th>{user.id}</th>
                    <td>{user.nic}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.gender}</td>
                    <td>{user.address}</td>
                    <td>{user.role}</td>
                    <td className="flex flex-row gap-2">
                      <button
                        className="btn btn-success"
                        onClick={() => handleEditButton(user)}
                      >
                        Edit
                      </button>
                      <button className="btn btn-primary">Delete</button>
                    </td>
                  </tr>
                ))
              : searchData?.map((user) => (
                  <tr key={user.id}>
                    <th>{user.id}</th>
                    <td>{user.nic}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.gender}</td>
                    <td>{user.address}</td>
                    <td>{user.role}</td>
                    <td className="flex flex-row gap-2">
                      <button
                        className="btn btn-success"
                        onClick={() => handleEditButton(user)}
                      >
                        Edit
                      </button>
                      <button className="btn btn-primary">Delete</button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed backdrop-blur-2xl inset-0 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleSaveButton}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    ID
                  </label>
                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleEditChange}
                    className="input w-full"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleEditChange}
                    className="input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    NIC
                  </label>
                  <input
                    type="text"
                    name="nic"
                    value={formData.nic}
                    onChange={handleEditChange}
                    className="input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleEditChange}
                    className="input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleEditChange}
                    className="input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleEditChange}
                    className="input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleEditChange}
                    className="input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <input
                    type="text"
                    name="gender"
                    value={formData.gender}
                    onChange={handleEditChange}
                    className="input w-full"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default ManageUsers;