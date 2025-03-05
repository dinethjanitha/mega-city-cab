import React, { useState } from 'react'

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

const ManageCab = () => {

    const [cab , setCab] = useState<Cab>();

    const fetchCab = async () => {
        const token = localStorage.getItem("token");
        
    }

  return (
    <div className='flex w-screen justify-center '>
        <div className='grid w-[800px] gap-4 grid-cols-3 '>
            <div className=' flex items-center justify-self-center '>
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
            </div>
            <div className='p-5 flex flex-col gap-3 col-span-2'>
                <div>
                    <p className=' text-xl font-bold'>Cab Name: </p>
                </div>
                <div>
                    <p className=' text-xl font-bold'>Owner name: </p>
                </div>
                <div>
                    <p className=' text-xl font-bold'>Cab Description: </p>
                </div>
                <div>
                    <p className=' text-xl font-bold'>Phone Number: </p>
                </div>
                <div>
                    <p className=' text-xl font-bold'>First 7Km Price: </p>
                </div>
                <div>
                    <p className=' text-xl font-bold'>Avarage Km price:</p>
                </div>
            </div>
           <div className='col-span-3'>
                div
           </div>
        </div>
    </div>
  )
}

export default ManageCab