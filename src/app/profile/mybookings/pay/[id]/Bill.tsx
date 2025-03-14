/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';

interface BillProp{
    id : string
}

interface Booking {
    id: string;
    userId: string;
    cabId: string;
    driverId: string;
    bookingTime: string;
    bookingDate: string;
    totalKM : number,
    total : number,
    bookingStatus: string;
    note: string;
    startDestination: string;
    endDestination: string;
    date: string;
  }
  

const Bill : React.FC<BillProp> = ({ id }) => {

    const [bill , setBill] = useState<Booking>({
        id: "",
        userId: "",
        cabId: "",
        driverId: "",
        bookingTime: "",
        bookingDate: "",
        totalKM: 0,
        total: 0,
        bookingStatus: "",
        note: "",
        startDestination: "",
        endDestination: "",
        date: "",
    });


    const [updateBill , setUpdateBill] = useState<Booking>({
        id: "",
        userId: "",
        cabId: "",
        driverId: "",
        bookingTime: "",
        bookingDate: "",
        totalKM: 0,
        total: 0,
        bookingStatus: "",
        note: "",
        startDestination: "",
        endDestination: "",
        date: "",
    });
    const [discountPercentage , setDiscountPercentage] = useState< number |null>(null)
    const [isDisabled , setIsDisabled] = useState<boolean>(false)
    const [discountCode , setDiscountCode] = useState<string>("");

    const fetchBill = async () => {
        const token = Cookies.get('tokenC');

        try{
            const response = await axios.get(`http://localhost:3005/api/v1/booking/${id}` , {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })

            console.log(response);
            setBill(response.data)
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBill();
    },[])


    const discount: { [key: string]: number } = {
        code1: 10,
    }

    const getDiscountCode = (e:React.ChangeEvent<HTMLInputElement>) => {
        setDiscountCode(e.target.value);
        console.log(e.target.disabled)

       
    }

    const applyDiscount = () => {
        setIsDisabled(true)

        if(discountCode in discount){
            console.log("valid discount code")

            setDiscountPercentage(discount[discountCode])
            console.log(discount[discountCode])

            const discountPrice =  bill.total * discount[discountCode] / 100

            console.log(discountPrice);

            const updatedTotal = bill.total - discountPrice;

            console.log(updatedTotal)

            setUpdateBill({
                ...bill,
                total : updatedTotal
            })

        }else{
            console.log("invalid discount code")
            setDiscountPercentage(null);

            setUpdateBill({
                ...bill,
                total : 0
            })
        }


        
    }
    console.log("Updated total:" + updateBill.total)

    console.log(bill)

  return (
    <div>
        {/* <input type="text" className=' input' onChange={applyDiscount} /> */}

        <div className=' w-[1200px] mx-auto  p-10'>
            <div className=' shadow-2xl p-10 rounded-2xl'>
                <div className=' text-2xl font-bold'>Payment Details</div>
                <div className="divider"></div>

                <div className=' grid grid-cols-3 gap-4'>
                    <div className=' flex flex-col'>
                        <div className='mt-5'>Booking id: {bill.id}</div>
                        <div className='mt-3'>Start Destination: {bill.startDestination}</div>
                        <div className='mt-3'>End Destination: {bill.endDestination}</div>
                        <div className='mt-3'>Cab ID: {bill.cabId}</div>
                    </div>
                        <div className=' flex flex-col col-span-2'>
                        <div className='mt-3'>First 7 Km price:</div>
                        <div className='mt-3'>Avarage Km price:</div>
                        <div className='mt-3'>Total Km: {bill.totalKM} KM</div>
                        <div className='mt-3'>Tax: Rs. 0.00</div>
                        <div className='mt-3'>Discount: {discountPercentage == null ? ("Not avalible") : (discountPercentage + "%")}</div>
                        <div className='mt-3'>Total Price: Rs.{updateBill.total == 0 ? (bill.total) : (updateBill.total)} </div>
                        <div className=' text-2xl font-bold mt-7'>Apply Discount code</div>
                        <input type="text" className=' input mt-3' onChange={getDiscountCode} disabled={isDisabled}/>
                        {
                            isDisabled ? (
                                <button className=' btn btn-primary w-fit mt-3' onClick={() => {
                                    setIsDisabled(false);
                                }} >Edit</button>
                            ) : (
                                <button className=' btn btn-primary w-fit mt-3' onClick={applyDiscount}>Apply</button>
                            )
                        }

                        <button className=' btn btn-primary mt-3 w-[500px]'>Pay Now</button>
                    </div>
                </div>
            </div> 
            </div>
    </div>
  )
}

export default Bill