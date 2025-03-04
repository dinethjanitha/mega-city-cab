"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface ProfileData {
  id: string;
  name: string;
  nic: string;
  email: string;
  username: string;
  address: string;
  role: string;
  gender: string;
}

const ProfilePage = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    id: "",
    name: "",
    nic: "",
    email: "",
    username: "",
    address: "",
    role: "",
    gender: ""
  });

  useEffect(() => {
    const fetchUserProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/v1/user/${localStorage.getItem('id')}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add the Bearer token to the request headers
          }
        });

        console.log(response);

        setProfileData({
          id: response.data.id,
          name: response.data.name,
          nic: response.data.nic,
          email: response.data.email,
          username: response.data.username,
          address: response.data.address,
          role: response.data.role,
          gender: response.data.gender
        });
      } catch (e: unknown) {
        console.log("Error getting profile data");
        console.log(e);
      }
    };

    fetchUserProfileData();
  }, []);

  console.log(profileData);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Profile Page</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name:</label>
          <p className="text-gray-900">{profileData.name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">NIC:</label>
          <p className="text-gray-900">{profileData.nic}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email:</label>
          <p className="text-gray-900">{profileData.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Username:</label>
          <p className="text-gray-900">{profileData.username}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Address:</label>
          <p className="text-gray-900">{profileData.address}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Role:</label>
          <p className="text-gray-900">{profileData.role}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Gender:</label>
          <p className="text-gray-900">{profileData.gender}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;