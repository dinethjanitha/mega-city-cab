"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios';
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

const MyCab = () => {


    const [ cabs , setCabs ] = useState<Cab[]>([]);

    const router = useRouter();
    

    const fetchCab = async () => {
        const token = localStorage.getItem('token');
        const userid = localStorage.getItem('id');
        try{
            const response = await axios.get(`http://localhost:3005/api/v1/cab/dirver/${userid}` , {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            console.log(response);
            setCabs(response.data);
        }catch(error){
            console.log(error)
        }
    }


    useEffect(() => {
        fetchCab();
    },[])

    console.log(cabs);

  return (
    <div className=' w-[1200px] mx-auto my-4'>
        <div className=' grid grid-cols-3'>
        {cabs.map((cab , index) => (
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
                             onClick={() => router.push(`/driver/managecab/${cab.id}`)}
                           >
                             View
                           </button>
                         </div>
                       </div>
                     </div>
        ))}
        </div>
    </div>
  )
}

export default MyCab