"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import SuccessAlert from '@/app/utils/SuccessAlert';
import LoadingAlert from '@/app/utils/LoadingAlert';
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

  interface Props{
    id : string
  }
  
const ManageCab : React.FC<Props> = ({ id }) => {

    const [cab , setCab] = useState<Cab>();
    const [editCab , setEditCab] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    
    const router = useRouter();

    const fetchCab = async () => {
        // const token = localStorage.getItem("token");
        try{
            const response = await axios.get(`http://localhost:3005/api/v1/cab/${id}`)

            console.log(response)

            // if(response.data.driveId != localStorage.getItem("userid")){
            //     console.log(" Under your id there is no vehical ");
            //     return
            // }else{
            //     setCab(response.data)
            // }
                setCab(response.data)

        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCab();
    },[])

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name , value } = e.target;

        setCab((preData) => ({
            ...preData,
            [name]: value
        } as Cab))
    }

    const updateCab = async () => {
        setSuccess(false)
        const updatedCabDetails = {
            id : cab?.id,
            cabName : cab?.cabName,
            ownerName: cab?.ownerName,
            cabDescription : cab?.cabDescription,
            phoneNumber : cab?.phoneNumber,
            first7kmPrice : cab?.first7kmPrice,
            avarageKmPrice : cab?.avarageKmPrice
        }

        setLoading(true)
        const token = localStorage.getItem('token');
        try{
            const response = await axios.patch("http://localhost:3005/api/v1/cab" , updatedCabDetails , {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            } ) 
          setLoading(false)
          setSuccess(true)
            console.log(response.data)
        }catch(error){
          setLoading(false)
          setSuccess(false)

            console.log(error)
        }
    }

    console.log(cab)

    const deleteCab = async () => {
      const token = localStorage.getItem('token');
      try{
        const response = await axios.delete(`http://localhost:3005/api/v1/cab/${cab?.id}` , {
          headers : {
            Authorization : `Bearer ${token}`
          }
        })

        console.log(response)
        router.push('/driver/addcabs')
      }catch(error){
        console.log(error)
      }

    }
  return (
    <div className="flex w-screen justify-center py-10">
      <div className="grid w-[800px] grid-cols-1 bg-white shadow-lg rounded-lg p-6">
      {success && (
            <SuccessAlert mzg='Updating success!'/>
            )}

            {loading && (
              <LoadingAlert mzg="Cab is Updating..."/>
            )}

        <div className="flex items-center justify-center">
            <figure className="relative h-48 w-full">
              <Image
                src={`http://localhost:3005/${cab?.imgUrl}`}
                layout="fill"
                objectFit="cover"
                alt={cab?.cabName || ""}
              />
            </figure>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <div>
            <div className="text-xl font-bold flex gap-3 flex-col">
              <p>
                Cab Name:
              </p>
              {editCab ? (
                <input type="text" className=" input input-bordered w-full" name='cabName' onChange={handleChange} defaultValue={cab?.cabName} />
              ) : (
                <span className="ml-2">{cab?.cabName}</span>
              )}
            </div>
          </div>
          <div>
            <p className="text-xl font-bold  flex gap-3 flex-col">
              Owner Name:
              {editCab ? (
                <input type="text" className=" input input-bordered w-full" name='ownerName' onChange={handleChange} defaultValue={cab?.ownerName} />
              ) : (
                <span className="ml-2">{cab?.ownerName}</span>
              )}
            </p>
          </div>
          <div>
            <p className="text-xl font-bold  flex gap-3 flex-col">
              Cab Description:
              {editCab ? (
                <input type="text" className="input input-bordered w-full" name='cabDescription' onChange={handleChange}  defaultValue={cab?.cabDescription} />
              ) : (
                <span className="ml-2">{cab?.cabDescription}</span>
              )}
            </p>
          </div>
          <div>
            <p className="text-xl font-bold  flex gap-3 flex-col">
              Phone Number:
              {editCab ? (
                <input type="text" className=" input input-bordered w-full" name='phoneNumber' onChange={handleChange} defaultValue={cab?.phoneNumber} />
              ) : (
                <span className="ml-2">{cab?.phoneNumber}</span>
              )}
            </p>
          </div>
          <div>
            <p className="text-xl font-bold  flex gap-3 flex-col">
              First 7KM Price:
              {editCab ? (
                <input type="text" className="input input-bordered w-full" name='first7kmPrice' onChange={handleChange} defaultValue={cab?.first7kmPrice} />
              ) : (
                <span className="ml-2">Rs.{cab?.first7kmPrice}</span>
              )}
            </p>
          </div>
          <div>
            <p className="text-xl font-bold  flex gap-3 flex-col">
              Average KM Price:
              {editCab ? (
                <input type="text" className=" input input-bordered w-full" name='avarageKmPrice' onChange={handleChange} defaultValue={cab?.avarageKmPrice} />
              ) : (
                <span className="ml-2">Rs.{cab?.avarageKmPrice}</span>
              )}
            </p>
          </div>
        </div>
        <div className=" flex justify-end">
            {editCab ? (
              <button className=' btn btn-primary' onClick={
                () => {
                  updateCab()
                  setEditCab(!editCab)
                }
              }>
              Update Cab
            </button>
            ) : (
              <button className=' btn btn-primary ml-3' onClick={() => setEditCab(!editCab)}>
                 Edit
              </button>
            )}
            
           


              <label htmlFor="my_modal_6" className="btn btn-primary mx-3">
                      Delete
                    </label>

                    <input
                      type="checkbox"
                      id="my_modal_6"
                      className="modal-toggle"
                    />
                    <div className="modal" role="dialog">
                      <div className="modal-box">
                        <h3 className="text-lg font-bold">Are you sure?</h3>
                        <p className="py-4">
                         
                          You went to delete this cab?
                        </p>
                        <div className="modal-action">
                          <label htmlFor="my_modal_6" className="btn">
                            Close
                          </label>
                          <label
                            htmlFor="my_modal_6"
                            className="btn btn-success text-black"
                            onClick={deleteCab}
                          >
                            Confirm
                          </label>
                        </div>
                      </div>
                    </div>
           
        
        </div>
      </div>
    </div>
  )
}

export default ManageCab