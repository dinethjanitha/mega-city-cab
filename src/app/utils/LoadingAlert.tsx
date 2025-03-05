import React from 'react'

interface Props{
    mzg : string
}

const LoadingAlert : React.FC<Props> = ({mzg}) => {
  return (
    <div role="alert" className="alert alert-info my-3">
        <span className="loading loading-spinner loading-xs"></span>
        <span>{mzg}</span>
    </div>
  )
}

export default LoadingAlert