import React from 'react'
import ManageCab from './ManageCab'

interface Props{
  params : Promise<{id : string}>
}

const page = async ({params}: Props) => {

  const id = (await params).id;

  return <div>
    <ManageCab id={id}/>
  </div>
  
}


export default page