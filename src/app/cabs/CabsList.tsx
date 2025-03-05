"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Cab{
    
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

const CabsList = () => {

    const router = useRouter();

    const [ cabs , setCabs ] = useState<Cab[]>([]);
    const [ loading , setLoading] = useState(false);
    const [error , setError] = useState(null);


    useEffect(() => {
        const fetchCabs = async () => {
            try{
                setLoading(true)
                const token = localStorage.getItem('token');
                console.log(token)

                const response = await axios.get("http://localhost:3005/api/v1/cabs")

                console.log(response);
                setCabs(response.data);
            }catch(error:unknown){
                console.log(error)
            }
        }

        fetchCabs();
    }, [])

    console.log(cabs)


  return (
    <div className=" w-[1200px] mx-auto ">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Cabs</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1">
        {cabs.map((cab, index) => (
          <div key={index} className="card bg-white shadow-lg w-96 rounded-lg overflow-hidden">
            <figure className="relative h-48 w-full">
              <Image
                src={`http://localhost:3005/${cab.imgUrl}`}
                layout="fill"
                objectFit="cover"
                alt={cab.cabName}
              />
            </figure>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2 flex justify-between items-center">
                {cab.cabName}
                <div className="badge badge-secondary">NEW</div>
              </h2>
              <p className="text-gray-700 mb-4">{cab.cabDescription}</p>
              <p className="text-gray-700 mb-2">
                First 7KM price: <span className="text-amber-600">Rs.{cab.first7kmPrice}</span>
              </p>
              <div className="flex justify-between items-center">
                <div className="badge badge-outline">{cab.status}</div>
                <div className="badge badge-outline">{cab.sheetCount} pax</div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => router.push(`/cabs/book/${cab.id}`)}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CabsList