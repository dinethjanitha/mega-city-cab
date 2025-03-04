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
    <div>
        <div className=' mx-auto grid gap-3 md:grid-cols-2 lg:grid-cols-3 items-center  justify-items-center sm:grid-cols-1 '>
         {cabs.map((cab,index) => (
            <div key={index} className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <Image
                src={`http://localhost:3005/` + cab.imgUrl}
                width={384}
                height={226}
                alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                {cab.cabName}
                <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{cab.cabDescription}</p>
                <p>First 7KM price: <span className=' text-amber-600'>Rs.{cab.first7kmPrice}</span></p>
                <div className=" justify-end">
                        <div className="badge badge-outline">{cab.status}</div>
                        <div className="badge badge-outline">{cab.sheetCount} pax</div>
                        <div className="card-actions justify-end">
                            <button className="btn btn-neutral" onClick={() => router.push(`/cabs/book/${cab.id}`)}>Book Now</button>
                        </div>
                </div>
            </div>
        </div>
         ))}

         
        </div>
        

    </div>
  )
}

export default CabsList