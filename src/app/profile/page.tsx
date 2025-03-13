"use client";
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FiUser, FiMail, FiMapPin, FiCopy, FiHash, FiCreditCard, FiBriefcase, FiUsers } from "react-icons/fi";
import SuccessAlert from '../utils/SuccessAlert';

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

  const [copySuccess, setCopySuccess] = useState("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [success , setSuccess] = useState<boolean>(false)

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

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(field);
    setTimeout(() => setCopySuccess(""), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(profileData)
    try {
      const response = await axios.put(`http://localhost:3005/api/v1/user`, profileData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Add the Bearer token to the request headers
        }
      });
      console.log("Profile updated successfully", response.data);
      setIsEditing(false);
      setShowModal(false);
      setSuccess(true)
      setTimeout(() => setSuccess(false) , 3000)
    } catch (e: unknown) {
      console.log("Error updating profile data");
      console.log(e);
    }
  };

  const InfoRow = ({ icon: Icon, label, value, name }: { icon: React.ComponentType; label: string; value: string; name: string }) => (
    <div className="flex items-center p-4 hover:bg-gray-50 transition-all duration-300 rounded-lg group">
      <Icon className="w-5 h-5 text-gray-500 mr-3"  />
      <div className="flex-1">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-gray-800 font-medium">{value}</p>
      </div>
      <button
        onClick={() => copyToClipboard(value, label)}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label={`Copy ${label}`}
      >
        <FiCopy className="w-5 h-5 text-gray-400 hover:text-blue-500" />
      </button>
      {copySuccess === label && (
        <span className="text-green-500 text-sm ml-2">Copied!</span>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8">
       {
        success && (
          <SuccessAlert mzg='Profile Update Successfull!'/>
        )
       }
      
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col items-center mb-8">
              <Image
                width={128}
                height={128}
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d"
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d";
                }}
                loading="lazy"
              />
            <h1 className="mt-4 text-2xl font-bold text-gray-800">{profileData.name}</h1>
            <p className="text-gray-500">{profileData.role}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoRow icon={FiHash} label="ID" value={profileData.id} name="id" />
            <InfoRow icon={FiUser} label="Name" value={profileData.name} name="name" />
            <InfoRow icon={FiCreditCard} label="NIC" value={profileData.nic} name="nic" />
            <InfoRow icon={FiMail} label="Email" value={profileData.email} name="email" />
            <InfoRow icon={FiUser} label="Username" value={profileData.username} name="username" />
            <InfoRow icon={FiMapPin} label="Address" value={profileData.address} name="address" />
            <InfoRow icon={FiBriefcase} label="Role" value={profileData.role} name="role" />
            <InfoRow icon={FiUsers} label="Gender" value={profileData.gender} name="gender" />
          </div>

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all duration-300"
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed mt-4 inset-0 backdrop-blur-2xl flex items-center justify-center ">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">ID</label>
                  <input
                    type="text"
                    name="id"
                    value={profileData.id}
                    onChange={handleInputChange}
                    className="input w-full"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">NIC</label>
                  <input
                    type="text"
                    name="nic"
                    value={profileData.nic}
                    onChange={handleInputChange}
                    className="input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={profileData.username}
                    onChange={handleInputChange}
                    className="input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    className="input w-full"
                  />
                </div>
           
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <input
                    type="text"
                    name="gender"
                    value={profileData.gender}
                    onChange={handleInputChange}
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
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;