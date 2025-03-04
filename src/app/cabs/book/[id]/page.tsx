
import React from 'react'
import BookCab from './BookCab';

interface Props{
    params : Promise<{ id : string}>
}

const page = async ({ params }:Props) => {
  
    const id = (await params).id;

    return (
    <div>
      <BookCab cabid={id}/>
    </div>
  )
}

export default page