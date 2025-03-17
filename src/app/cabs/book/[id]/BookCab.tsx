"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "cally";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import IsAuth from "@/app/utils/IsAuth";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
// import Cookies from "js-cookie";
// import { useCookies } from "next-client-cookies";

interface BookCabProps {
  cabid: string;
}

interface Cab {
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

const BookCab: React.FC<BookCabProps> = ({ cabid }) => {
  const [cab, setCab] = useState<Cab | null>(null);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("10:00");
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [loading , setLoading] = useState<boolean>(false)
  const userid = localStorage.getItem("id");


  // const cookies = useCookies();
  useEffect(() => {
    const fetchCab = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/api/v1/cab/${cabid}`
        );
        setCab(response.data);
      } catch (error: unknown) {
        console.log(error);
      }
    };

    fetchCab();
  }, [cabid]);

  console.log(cab);

  const [bookingData, setBookingData] = useState({
    userId: "",
    cabId: "",
    driverId: "",
    bookingTime: "",
    bookingDate: "",
    bookingStatus: "new",
    note: "",
    date: new Date(),
    startDestination: "",
    endDestination: "",
    startTime: "",
  });

  const router = useRouter();
  const pathName = usePathname();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setError(null);
    const { name, value } = e.target;
    setBookingData((preData) => ({
      ...preData,
      [name]: value,
    }));
  };

  console.log(bookingData);

  const DatePick = () => {
    return (
      <>
        <button
          popoverTarget="rdp-popover"
          onClick={() => setShowCalendar(!showCalendar)}
          className="input input-border"
          style={{ anchorName: "--rdp" } as React.CSSProperties}
        >
          {date ? date.toLocaleDateString() : "Pick a date"}
        </button>
        {showCalendar && (
          <div
            className="relative mt-2"
            style={{ positionAnchor: "--rdp" } as React.CSSProperties}
          >
            <DayPicker
              className="react-day-picker"
              mode="single"
              selected={date}
              onSelect={setDate}
              required
            />
          </div>
        )}
      </>
    );
  };

  const handleSubmit = async () => {
    setError(null);
    setLoading(false);
    setSuccess(false);

    console.log(error);
    const updatedBookingData = {
      ...bookingData,
      userId: userid || "",
      cabId: cab?.id || "",
      driverId: cab?.driveId || "",
      bookingTime: time,
      bookingDate: date?.toString() || "",
    };
    setBookingData(updatedBookingData);

    console.log("Booking -------------------------- Data");
    console.log(updatedBookingData);
    console.log("Booking -------------------------- Data");

    if (updatedBookingData.driverId === "" || updatedBookingData.cabId === "") {
      setError("Driver Id or Cab Id missing");
      return;
    }

    // const errorFeild = 

    // const requiredFeild: (keyof typeof bookingData)[] = ['bookingTime' , 'bookingDate' , 'startDestination' , 'endDestination' ]

    // requiredFeild.some((a) => {
    //   if(updatedBookingData[a] === ""){
    //     setError(a+ " is required!");
    //     return true;
    //   }
    //   return false;
    // })
    // setError(null)
    console.log("error--------------------------")
    console.log(error)
    if(updatedBookingData.bookingDate == "" 
      || updatedBookingData.bookingTime == "" || updatedBookingData.startDestination == "" 
      || updatedBookingData.endDestination == "" ){
        setError("Required filed missed!");
        // setError(null);
        return;
      }

      

    if (error == null) {
      try {
        console.log("-----------runingggg")
        setLoading(true)
        const token = localStorage.getItem("token");
        // const token = cookies.get('token');
        const response = await axios.post(
          "http://localhost:3005/api/v1/booking",
          updatedBookingData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false);
        // setError(null);
        setSuccess(true);


        console.log(response);

        // sendBookingEmail();
        const userEmail = localStorage.getItem('email');
        const resopnse = await axios.post('http://localhost:3000/api/sendemail', {
          email: userEmail,
          bookingData: updatedBookingData,
          mzg : "changed"
        });

        console.log("-------resopnse-------")
        console.log(resopnse)
      } catch (e) {
        setLoading(false)
        console.log(e);
      }
    }
  };

  const handleConfirm = () => {
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  console.log(date);

  if (!cab) return <div>Loading...</div>;

  return (
    <div className="w-screen">
    <form>
    <div className="mx-auto grid max-w-screen-lg px-6 pb-20">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-blue-900">Cab Details</h2>
          <div className="bg-white shadow-md rounded-lg p-6 mt-4">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <Image
                  src={`http://localhost:3005/${cab.imgUrl}`}
                  width={384}
                  height={226}
                  alt={cab.cabName}
                  className="rounded-lg"
                />
              </div>
              <div className="md:w-1/2 md:pl-6">
                <h2 className="text-xl font-bold mb-2">{cab.cabName}</h2>
                <p className="mb-2">{cab.cabDescription}</p>
                <p className="mb-2">
                  First 7KM price:{" "}
                  <span className="text-amber-600">Rs.{cab.first7kmPrice}</span>
                </p>
                <p className="mb-2">
                  Average KM price:{" "}
                  <span className="text-amber-600">
                    Rs.{cab.avarageKmPrice}
                  </span>
                </p>
                <p className="mb-2">Seats: {cab.sheetCount}</p>
                <p className="mb-2">Status: {cab.status}</p>
                <p className="mb-2">Owner: {cab.ownerName}</p>
                <p className="mb-2">Phone: {cab.phoneNumber}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-blue-900 text-xl">
                Enter Start Destination
              </legend>
              <input
                type="text"
                name="startDestination"
                onChange={handleChange}
                className="input"
                placeholder="Type here"
                required
              />
            </fieldset>
          </div>

          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-blue-900 text-xl">
                Enter End Destination
              </legend>
              <input
                type="text"
                name="endDestination"
                onChange={handleChange}
                className="input"
                placeholder="Type here"
                required
              />
            </fieldset>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-blue-900">
              Select a Booking Time
            </h2>
            <div className="relative mt-4 w-56 h-12">
              <TimePicker
                name="bookingTime"
                value={time}
                className="input relative z-5 h-full"
                onChange={(value) => setTime(value || "10:00")}
                format="HH:mm" // Set the format to 24-hour clock
                required
              />
              <div id="date-picker" className="hidden"></div>
            </div>
          </div>

          <div className="mb-3">
            <h2 className="text-xl font-bold text-blue-900">Select a Date</h2>
            <div className="my-3">
              <DatePick />
            </div>
          </div>
        </div>

        <fieldset className="fieldset col-span-1 mb-3 ">
          <legend className="fieldset-legend">Leave Note For driver</legend>
          <textarea
            name="note"
            onChange={handleChange}
            className="textarea h-24 w-full"
            placeholder="Bio"
          ></textarea>
        </fieldset>

        {error != null && (
          <div role="alert" className="alert alert-error my-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {success && (
              <div role="alert" className="alert alert-success my-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Booking place success full! View <Link href={`/profile/mybookings`} className=" link link-secondary">My Book</Link> page for status!</span>
              </div>
            )}

            {loading && (
              <div role="alert" className="alert alert-info my-3">
                <span className="loading loading-spinner loading-xs"></span>
                <span>Cab adding in progress!</span>
              </div>
            )}


        {IsAuth() ? (
          <>
            <button
              type="button"
              onClick={handleConfirm}
              className="w-56 btn btn-success"
            >
              Book Now
            </button>
            {showConfirmation && (
              <div className="fixed backdrop-blur-2xl inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-bold mb-4">
                    Confirm Booking
                  </h2>
                  <p className="mb-4">
                    Are you sure you want to book this cab?
                  </p>
                  <div className="flex justify-end">
                    <button
                      className="btn btn-secondary mr-2"
                      
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary"
                      
                      onClick={() => {
                        handleSubmit();
                        setShowConfirmation(false);
                      }}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <button
            onClick={() => router.push(`/signin?redirect=${pathName}`)}
            className="w-56 btn btn-success"
          >
            Sign In to Book
          </button>
        )}
      </div>
    </form>
    </div>
  );
};

export default BookCab;