import React from 'react'
import Bill from './Bill';

interface Props{
    params : Promise<{ id : string}>
}

const page = async ({params} : Props) => {

    const id = (await params).id;

  return (
    <div>
        <Bill id={id}/>
    </div>
  )
}

export default page