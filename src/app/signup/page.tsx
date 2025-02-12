import React from 'react'

const SignUp = () => {
  return (
    <div className=' h-screen w-screen flex justify-center items-center' >
        <div className=' flex flex-col gap-3 shadow-xl p-6 rounded-xl'>
            <div><span className=' text-3xl font-bold'>Registration</span></div>
            <div className=' grid grid-cols-2 w-[700] gap-3' >
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        Name
                        <input type="text" className="grow" placeholder="Bob" />
                    </label>
                </div>
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        Email
                        <input type="email" className="grow" placeholder="user@mail.com" />
                    </label>
                </div>
                
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        Username
                        <input type="text" className="grow" placeholder="0xBob" />
                    </label>
                </div>
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        Password
                        <input type="email" className="grow" placeholder="********" />
                    </label>
                </div>

                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        NIC
                        <input type="text" className="grow" placeholder="20032345656" />
                    </label>
                </div>
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        Address
                        <input type="email" className="grow" placeholder="No.23,Matara" />
                    </label>
                </div>

                <div>
                    <select className="select select-bordered w-full max-w-xs">
                        <option>Gender</option>
                        <option>Han Solo</option>
                        <option>Greedo</option>
                    </select>
                </div>
            </div>
            <button className=' btn btn-primary'>Sign Up</button>
        </div>
    </div>
  )
}

export default SignUp