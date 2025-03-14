"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoadingAlert from '../utils/LoadingAlert';
// import Cookies from 'js-cookie';
import { useCookies } from 'next-client-cookies';
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

const CabsList = () => {
  const router = useRouter();
  const cookies = useCookies();
  const [cabs, setCabs] = useState<Cab[]>([]);
  const [searchCabs, setSearchCabs] = useState<Cab[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  // const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchCabs = async () => {
      try {
        setLoading(true);
        // const token = localStorage.getItem('token');
        const token = cookies.get('token');
        console.log(token);

        const response = await axios.get("http://localhost:3005/api/v1/cabs");

        console.log(response);
        setCabs(response.data);
        setSearchCabs(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error)
      }
    };

    fetchCabs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(error)

  console.log(cabs);

  const handlesearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const typing = e.target.value;
    // setSearch(typing);

    if (typing !== "") {
      const cabsforSearch = cabs;

      let numberValue = 0;

      try {
        numberValue = parseFloat(typing);
      } catch {
        numberValue = 0;
      }

      const result = cabsforSearch.filter((cab) => {
        if (
          cab.cabDescription.toLowerCase().includes(typing.toLowerCase()) ||
          cab.first7kmPrice === numberValue ||
          cab.cabName.toLowerCase().includes(typing.toLowerCase())
        ) {
          return cab;
        }
      });

      console.log("result");
      setSearchCabs(result);
    } else {
      setSearchCabs(cabs);
    }
  };

  console.log(searchCabs);

  return (
    <div className="  ">
      <div className="flex flex-col items-center mb-6 p-3">
        <h1 className="text-3xl font-bold mb-6 text-center">Available Cabs</h1>
        <input
          type="text"
          className="input input-bordered w-full max-w-md my-3"
          onChange={handlesearch}
          placeholder="Type to Search Vehicle"
        />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full p-3">
        {
          loading && <LoadingAlert mzg='Cab is loading...'/>
        }
        {searchCabs.length >= 1 ? (
          searchCabs.map((cab, index) => (
            <div key={index} className="card bg-white shadow-lg rounded-lg overflow-hidden">
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
          ))
        ) : (
          cabs.map((cab, index) => (
            <div key={index} className="card bg-white shadow-lg rounded-lg overflow-hidden">
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
          ))
        )}
      </div>
    </div>
  );
};

export default CabsList;