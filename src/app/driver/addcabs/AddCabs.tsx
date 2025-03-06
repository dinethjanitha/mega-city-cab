"use client";
import axios from 'axios';
import React, { useState } from 'react';
import Image from 'next/image';

const AddCabs = () => {
 
    const userid = localStorage.getItem("id");
    const token = localStorage.getItem("token");


  const [formData, setFormData] = useState({
    cabName: "",
    driverid: userid,
    status: "available",
    driverlicence: "",
    description: "",
    cabOwnerName: "",
    phoneNumber: "",
    sheetCount: 0,
    first7kmPrice: 0.00,
    avarageKmPrice: 0.00,
    image: null as File | null
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [addSuccess, setAddSuccess] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((preData) => ({
      ...preData,
      [name]: value
    }));
  };

  console.log(formData);
  console.log(image);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const phonenumber = `+94${formData.phoneNumber}`;
    const updatedFormData = {
      ...formData,
      phoneNumber: phonenumber,
      image: image
    };

    console.log("updatedFormData");
    console.log(updatedFormData);

    try {
      
      setError(null);
      setLoading(true);
      setAddSuccess(false);

    //   const formDataToSend = new FormData();
    //   formDataToSend.append("cabName", updatedFormData.cabName);
    //   formDataToSend.append("driverid", updatedFormData.driverid || "");
    //   formDataToSend.append("status", updatedFormData.status);
    //   formDataToSend.append("description", updatedFormData.description);
    //   formDataToSend.append("cabOwnerName", updatedFormData.cabOwnerName);
    //   formDataToSend.append("phoneNumber", updatedFormData.phoneNumber);
    //   formDataToSend.append("first7kmPrice", updatedFormData.first7kmPrice.toString());
    //   formDataToSend.append("avarageKmPrice", updatedFormData.avarageKmPrice.toString());
    //   if (updatedFormData.image) {
    //     formDataToSend.append("image", updatedFormData.image);
    //   }

      const response = await axios.post("http://localhost:3005/api/v1/cabs", updatedFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

    //   setFormData((preData) => ({
    //     ...preData,
    //     phoneNumber : ""
    //   }))

      setLoading(false);
      setAddSuccess(true);
      console.log(response);
    } catch (e) {
        if (axios.isAxiosError(e) && e.response?.data != null) {
            console.log(e);
            setError(e.response.data);
        }else{
            setError(e.message)
            console.log(e)
        
        }
      
      setLoading(false);
    }
  };

  return (
    <div className='w-screen h-screen flex justify-center'>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-3 w-[600px]'>
          <div>
            {addSuccess && (
              <div role="alert" className="alert alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Cab Adding Successful!</span>
              </div>
            )}

            {loading && (
              <div role="alert" className="alert alert-info">
                <span className="loading loading-spinner loading-xs"></span>
                <span>Cab adding in progress!</span>
              </div>
            )}

            {error != null && (
             <div role="alert" className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
            </div>
            )}      
          </div>

          <h2 className='text-5xl'>Add Cab</h2>

          <input type="text" name='cabName' onChange={handleChange} placeholder="Cab Name" className="input w-full" required />

          <input type="number" className="input validator w-full" name='sheetCount' onChange={handleChange} required placeholder="Enter Sheet Count" 
            min="1" max="10" title="Must be between be 1 to 10" />
          <p className=" hidden mt-0 validator-hint">Must be between be 1 to 10</p>

          <input type="text" name='cabOwnerName' onChange={handleChange} placeholder="Owner Name" className="input w-full" required />

          <input type="text" name='driverlicence' onChange={handleChange} placeholder="Driving licence id" className="input w-full" required />

          <input type="number" step="0.001" name='first7kmPrice' onChange={handleChange} className="input validator w-full" required placeholder="Enter a 1KM price for First 7Km"
            title="Must be between be 1 to 10" />
          <p className="mt-0 hidden validator-hint">Enter Valid Value</p>

          <input type="number" step="0.001" name='avarageKmPrice' onChange={handleChange} className="input validator w-full" required placeholder="Enter an average 1KM price"
            title="Must be between be 1 to 10" />
          <p className="mt-0 hidden validator-hint">Enter Valid Value</p>

          <input type="text" name='description' placeholder="Description" onChange={handleChange} className="input w-full" required />

          <label className="input w-full">
            <span className="label">+94</span>
            <input type="text" name='phoneNumber' onChange={handleChange} className='' placeholder="Phone number" />
          </label>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Add Cab Photo</legend>
            <input type="file" className="file-input" onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }
            }} />
            <label className="fieldset-label">Max size 2MB</label>
          </fieldset>
          {preview && (
            <Image src={preview} alt="" width={200} height={400} />
          )}
          <button type='submit' className='btn'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddCabs;