"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'


interface BillProp{
    id : string
}

const Bill : React.FC<BillProp> = ({ id }) => {

    const [bill , setBill] = useState();

    const fetchBill = async () => {
        const token = localStorage.getItem("token");

        try{
            const response = await axios.get(`http://localhost:3005/api/v1/booking/${id}` , {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })

            console.log(response);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBill();
    },[])


    const discount = {
        code1 : 10,
    }

    const applyDiscount = (e:React.ChangeEvent<HTMLInputElement>) => {
        const discountCode = e.target.value
        
        if(discountCode in discount){
            console.log("valied code found!")
        }else{
            console.log("Code not valid!")

        }


        
    }

  return (
    <div>
        <input type="text" className=' input' onChange={applyDiscount} />
    </div>
  )
}

export default Bill