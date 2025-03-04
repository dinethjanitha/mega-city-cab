"use client";
import WithAuth from "@/app/utils/WithAuth";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  nic: string;
  gender: string;
  address: string;
  password: string;
  email: string;
  username: string;
}

const ManageUsers = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState<User>({
    id: "",
    name: "",
    nic: "",
    gender: "",
    address: "",
    password: "",
    email: "",
    username: "",
  });

  const handleEditButton = (user: User) => {
    setEditUserId(user.id);
    setFormData({
      id: user.id,
      name: user.name,
      nic: user.nic,
      gender: user.gender,
      address: user.address,
      password: user.password,
      email: user.email,
      username: user.username,
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((preData) => ({
      ...preData,
      [name]: value,
    }));
  };

  const handleSaveButton = async () => {
    console.log("-------------");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3005/api/v1/user",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      if (users) {
        setUsers(users.map((user) => (user.id === formData.id ? formData : user)));
      }
      setEditUserId(null);
    } catch (e: unknown) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
        console.log(`Bearer ${token}`);
        const response = await axios.get("http://localhost:3005/api/v1/users", {
          headers: {
            Authorization: `Bearer ${token}`, // Add the Bearer token to the request headers
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  console.log(users);
  console.log(formData);

  return (
    <div className="p-10 w-screen">
      <div className="overflow-x-auto">
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
            {users?.map((user, index) => (
              <tr key={user.id}>
                <th>{index + 1}</th>
                <td>
                  {editUserId === user.id ? (
                    <input
                      type="text"
                      value={formData.nic}
                      name="nic"
                      onChange={handleEditChange}
                      className="input input-bordered w-full"
                    />
                  ) : (
                    user.nic
                  )}
                </td>
                <td>
                  {editUserId === user.id ? (
                    <input
                      type="text"
                      value={formData.name}
                      name="name"
                      onChange={handleEditChange}
                      className="input input-bordered w-full"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editUserId === user.id ? (
                    <input
                      type="text"
                      value={formData.username}
                      name="username"
                      onChange={handleEditChange}
                      className="input input-bordered w-full"
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td>
                  {editUserId === user.id ? (
                    <input
                      type="text"
                      value={formData.email}
                      name="email"
                      onChange={handleEditChange}
                      className="input input-bordered w-full"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>{user.password}</td>
                <td>
                  {editUserId === user.id ? (
                    <input
                      type="text"
                      value={formData.gender}
                      name="gender"
                      onChange={handleEditChange}
                      className="input input-bordered w-full"
                    />
                  ) : (
                    user.gender
                  )}
                </td>
                <td>
                  {editUserId === user.id ? (
                    <input
                      type="text"
                      value={formData.address}
                      name="address"
                      onChange={handleEditChange}
                      className="input input-bordered w-full"
                    />
                  ) : (
                    user.address
                  )}
                </td>
                <td>USER</td>
                <td className="flex flex-row gap-2">
                  {editUserId === user.id ? (
                    <button className="btn btn-success" onClick={handleSaveButton}>
                      Save
                    </button>
                  ) : (
                    <button className="btn btn-success" onClick={() => handleEditButton(user)}>
                      Edit
                    </button>
                  )}
                  <button className="btn btn-primary">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WithAuth(ManageUsers);