"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import "cally";
import { CalendarDate } from 'cally';

interface BookCabProps {
  cabid: string;
}

interface Cab {
  id: string;
  addedDate: string;
  avarageKmPrice: number;
  cabDescription: string;
  cabName: string;
  driveId: string;
  driverLicence: string;
  first7kmPrice: number;
  imgUrl: string;
  ownerName: string;
  phoneNumber: string;
  sheetCount: number;
  status: string;
}

const BookCab: React.FC<BookCabProps> = ({ cabid }) => {
  const [cab, setCab] = useState<Cab | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("Pick a date");

  useEffect(() => {
    const fetchCab = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/v1/cab/${cabid}`);
        setCab(response.data);
      } catch (error: unknown) {
        console.log(error);
      }
    };

    fetchCab();
  }, [cabid]);

  if (!cab) return <div>Loading...</div>;

  const handleChange = () => {
    console.log("press")
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Book Cab</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <Image
              src={`http://localhost:3005/${cab.imgUrl}`}
              width={384}
              height={226}
              alt={cab.cabName}
              className="rounded-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-6">
            <h2 className="text-xl font-bold mb-2">{cab.cabName}</h2>
            <p className="mb-2">{cab.cabDescription}</p>
            <p className="mb-2">First 7KM price: <span className="text-amber-600">Rs.{cab.first7kmPrice}</span></p>
            <p className="mb-2">Average KM price: <span className="text-amber-600">Rs.{cab.avarageKmPrice}</span></p>
            <p className="mb-2">Seats: {cab.sheetCount}</p>
            <p className="mb-2">Status: {cab.status}</p>
            <p className="mb-2">Owner: {cab.ownerName}</p>
            <p className="mb-2">Phone: {cab.phoneNumber}</p>
            
            
            <div className="dropdown bg-base-100 rounded-box shadow-lg">
           </div>

            <button className="btn btn-primary mt-4">Confirm Booking</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCab;