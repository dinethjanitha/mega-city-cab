import React from 'react'
import Link from 'next/link'

const HowtoPlaceBooking = () => {
  return (
    <div>
      <div className=' container lg:w-[1200px] lg:mx-auto flex flex-col'>
            <div className="flex flex-col my-5">
                <h2 className=' text-3xl font-bold lg:mt-10'> FAQ</h2>
            </div>  

            <div className=' grid  grid-cols-1 gap-2 mt-3'>
              <div className="collapse collapse-arrow  bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-1" />
                <div className="collapse-title font-semibold">How do I create an account ?</div>
                <div className="collapse-content text-sm">
                    <ul className="steps steps-vertical">
                      <li className="step step-primary flex flex-row"><span>Go to <Link href={"/signin"} className=' link link-primary '>Sign up Page</Link></span></li>
                      <li className="step step-primary">Enter your details</li>
                      <li className="step step-primary step-success">Click Sign up</li>
                    </ul>
                </div>
              </div>
              <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-1" />
                <div className="collapse-title font-semibold">How can I place booking ?</div>
                <div className="collapse-content text-sm">
                <ul className="steps steps-vertical">
                      <li className="step step-primary flex flex-row"><span>Go to <Link href={"/cabs"} className=' link link-primary'>View Cabs page</Link></span></li>
                      <li className="step step-primary">Select Cab with your preference</li>
                      <li className="step step-primary">Click &quot;Book Now&quot; Button</li>
                      <li className="step step-primary">Fill Booking details</li>
                      <li className="step step-primary step-success">Click &quot;Confirm Booking&quot; Button</li>
                    </ul>
                </div>
              </div>

              <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-1" />
                <div className="collapse-title font-semibold">How can I delete booking ?</div>
                <div className="collapse-content text-sm">
                  
                <ul className="steps steps-vertical">
                      <li className="step step-primary"><span>Go to <Link href={"/profile/mybookings"} className=' link link-primary'>My Booking</Link></span></li>
                      <li className="step step-primary">Select your booking</li>
                      <li className="step step-primary step-success">Click &quot;Delete&quot; button</li>
                    </ul>
                </div>
              </div>
            </div>

           
      </div>  
    </div>
  )
}

export default HowtoPlaceBooking