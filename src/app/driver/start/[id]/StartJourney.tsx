"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface StartJourneyInter {
  id: string;
}

interface Booking {
  id: string;
  userId: string;
  cabId: string;
  driverId: string;
  bookingTime: string;
  bookingDate: string;
  totalKM: number;
  total: number;
  bookingStatus: string;
  note: string;
  startDestination: string;
  endDestination: string;
  date: string;
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

const StartJourney: React.FC<StartJourneyInter> = ({ id }) => {
  const [booking, setBooking] = useState<Booking>({
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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [totalKM, setTotalKM] = useState();
  const [total, setTotal] = useState();
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const [cabDetails, setCabDetails] = useState<Cab>();

  const fetchBooking = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `http://localhost:3005/api/v1/booking/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      console.log(response.data.driverId);

      if (response.data.driverId != localStorage.getItem("id")) {
        setError(true);
        console.log("This order not yours!");
        return;
      } else {
        setBooking(response.data);
        fetchCab(response.data.cabId);
      }

      setLoading(false);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const fetchCab = async (cabId: string) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    console.log(`http://localhost:3005/api/v1/cab/${cabId}`);

    try {
      const response = await axios.get(
        `http://localhost:3005/api/v1/cab/${cabId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      console.log("Cab details");
      console.log(response.data);
      setCabDetails(response.data);

      setLoading(false);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  const calculateTotal = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setTotal(0);
    if (e.target.value == "") {
      e.target.value = "0";
    }

    setTotalKM(e.target.value);

    const destination: number = parseInt(e.target.value);
    if (destination < 7) {
      setTotal(destination * cabDetails.avarageKmPrice);
    } else {
      let total99 = destination - 7;
      setTotal(cabDetails.first7kmPrice + total99 * cabDetails.avarageKmPrice);
    }

    console.log(cabDetails.first7kmPrice);
  };

  const updateBill = async () => {
    const token = localStorage.getItem("token");

    const updateBookngData = {
      id: booking.id,
      totalKM: totalKM,
      total: total,
      bookingStatus: "ready",
    };

    console.log("---------updateBill");
    console.log(updateBookngData);

    try {
      const response = await axios.patch(
        "http://localhost:3005/api/v1/booking/bill",
        updateBookngData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("----------update response");
      console.log(response);
      fetchBooking();

    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  console.log(`Total is: ` + total);
  return (
    <div className="w-full flex justify-center p-5">
      <div className="w-full max-w-4xl bg-base-100 shadow-xl rounded-xl p-6">
        <h2 className="text-3xl font-bold text-primary text-center mb-4">
          Start Your Journey
        </h2>
        <p className="text-lg text-secondary text-center mb-6">
          Booking Details
        </p>
        {booking.totalKM == 0 && (
          <div role="alert" className="alert alert-warning my-3">
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>Add Total KM count for Calculate Bill</span>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card bg-neutral text-neutral-content p-4 rounded-lg">
            <p className="text-lg font-semibold">Booking Id:</p>
            <p className="text-md">{booking.id}</p>
          </div>
          <div className="card bg-neutral text-neutral-content p-4 rounded-lg">
            <p className="text-lg font-semibold">User Id:</p>
            <p className="text-md">{booking.userId}</p>
          </div>
          <div className="card bg-neutral text-neutral-content p-4 rounded-lg">
            <p className="text-lg font-semibold">Cab Id:</p>
            <p className="text-md">{booking.cabId}</p>
          </div>
          <div className="card bg-neutral text-neutral-content p-4 rounded-lg">
            <p className="text-lg font-semibold">Driver Id:</p>
            <p className="text-md">{booking.driverId}</p>
          </div>
          <div className="card bg-neutral text-neutral-content p-4 rounded-lg">
            <p className="text-lg font-semibold">Booking Time:</p>
            <p className="text-md">{booking.bookingTime}</p>
          </div>
          <div className="card bg-neutral text-neutral-content p-4 rounded-lg">
            <p className="text-lg font-semibold">Booking Date:</p>
            <p className="text-md">
              {new Date(booking.bookingDate).toLocaleDateString()}
            </p>
          </div>
          <div className="card bg-neutral text-neutral-content p-4 rounded-lg">
            <p className="text-lg font-semibold">Total KM:</p>
            <p className="text-md">{booking.totalKM}</p>
          </div>
          <div className="card bg-neutral text-neutral-content p-4 rounded-lg">
            <p className="text-lg font-semibold">Total Amount:</p>
            <p className="text-md">${booking.total}</p>
          </div>
          <div className="card bg-neutral text-neutral-content p-4 rounded-lg">
            <p className="text-lg font-semibold">Booking Status:</p>
            <p className="text-md">{booking.bookingStatus}</p>
          </div>
          <div className="card bg-neutral text-neutral-content p-4 rounded-lg">
            <p className="text-lg font-semibold">Note:</p>
            <p className="text-md">{booking.note || "N/A"}</p>
          </div>
          <div className="card bg-neutral text-neutral-content p-4 rounded-lg">
            <p className="text-lg font-semibold">Start Destination:</p>
            <p className="text-md">{booking.startDestination}</p>
          </div>
          <div className="card bg-neutral text-neutral-content p-4 rounded-lg">
            <p className="text-lg font-semibold">End Destination:</p>
            <p className="text-md">{booking.endDestination}</p>
          </div>
        </div>

        {booking.totalKM == 0 && (
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-xl">
                Enter Total KM count
              </legend>
              <input
                type="number"
                onChange={calculateTotal}
                className="input validator"
                step={0.001}
                required
                placeholder="Type a number between 1 to 10"
                min="1"
                max="1000"
                title="Must be between be 1 to 10"
              />
            </fieldset>

            <div className=" my-3">
              <p className=" text-xl">
                Total : <span className=" badge badge-warning">{total}</span>
              </p>
            </div>

            <div className="text-center mt-6">
              <button
                className="btn btn-primary"
                onClick={() => setShowConfirmation(true)}
              >
                Start Journey
              </button>
            </div>
          </div>
        )}

        {showConfirmation && (
          <div className="fixed backdrop-blur-2xl inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Confirm Booking</h2>
              <p className="mb-4">
                Please double check the distinstion is correct  
              <br/>
                Are you sure distinstion is correct?</p>
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
                    updateBill();
                    setShowConfirmation(false);
                  }}
                >
                 Yes, Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartJourney;
