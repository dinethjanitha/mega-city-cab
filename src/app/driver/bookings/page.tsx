"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Booking {
  id: string;
  userId: string;
  cabId: string;
  driverId: string;
  bookingTime: string;
  bookingDate: string;
  bookingStatus: string;
  note: string;
  startDestination: string;
  endDestination: string;
  date: string;
}

const BookingDetails = () => {
  const driverId = localStorage.getItem("id");

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const fetchDriverBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3005/api/v1/bookings/driver/${driverId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setBookings(
        response.data.sort((a: Booking, b: Booking) => new Date(b.date).getTime() - new Date(a.date).getTime())
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchDriverBookings();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const confirmBooking = async (bookingId: string) => {
    console.log("press");
    const updatedData = {
      id: bookingId,
      bookingStatus: "confirm",
    };
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        "http://localhost:3005/api/v1/booking",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      fetchDriverBookings();
    } catch (e) {
      console.log(e);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    console.log("press");
    const updatedData = {
      id: bookingId,
      bookingStatus: "cancel",
    };
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        "http://localhost:3005/api/v1/booking",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      fetchDriverBookings();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className=" grid grid-cols-1 w-[1000px] mx-auto gap-3 mt-5">
        {bookings.map((booking, index) => (
          <div
            key={index}
            className="card card-side shadow-2xl bg-white rounded-lg overflow-hidden w-full max-w-4xl mx-auto"
          >
            <div className="w-1/3 bg-gradient-to-r from-green-400 to-blue-500 p-6 flex flex-col justify-center text-white">
              <div className="mb-4">
                <span className="text-lg font-semibold">Order Status:</span>
                <div className="badge badge-secondary ml-2">
                  {booking.bookingStatus}
                </div>
              </div>
              <div className="badge badge-success mt-5 text-lg">
                You Got a New Order
              </div>
            </div>
            <div className="card-body p-6">
              <h2 className="card-title text-2xl font-bold mb-2">
                Booking ID: {booking.id}
              </h2>
              <p className="text-lg mb-2">
                <span className="font-semibold">User ID:</span> {booking.userId}
              </p>
              <p className="text-lg mb-2">
                <span className="font-semibold">Start Destination:</span>{" "}
                {booking.startDestination}
              </p>
              <p className="text-lg mb-2">
                <span className="font-semibold">End Destination:</span>{" "}
                {booking.endDestination}
              </p>
              <p className="text-lg mb-2">
                <span className="font-semibold">Date:</span>{" "}
                {formatDate(booking.bookingDate)}
              </p>
              <p className="text-lg mb-2">
                <span className="font-semibold">Time:</span>{" "}
                {booking.bookingTime}
              </p>
              <p className="text-lg mb-2">
                <span className="font-semibold">Customer Message:</span>{" "}
                {booking.note}
              </p>
              <p className="text-sm text-gray-600 mt-4">
                Please check the booking date and time. Once confirmed, you
                cannot cancel this order.
              </p>
              <div className="card-actions  justify-end mt-6">
                {booking.bookingStatus == "confirm" && (
                  <button className=" btn btn-dash" onClick={() => router.push(`/driver/start/${booking.id}`)}>Start Journey</button>
                )}
                {booking.bookingStatus == "new" && (
                  <div>
                    <label
                      htmlFor="my_modal_7"
                      className="btn btn-warning mx-3"
                    >
                      Cancel this Booking
                    </label>

                    <input
                      type="checkbox"
                      id="my_modal_7"
                      className="modal-toggle"
                    />
                    <div className="modal" role="dialog">
                      <div className="modal-box">
                        <h3 className="text-lg font-bold">Are you sure?</h3>
                        <p className="py-4">You went to cancel this booking?</p>
                        <div className="modal-action">
                          <label htmlFor="my_modal_7" className="btn">
                            Close
                          </label>
                          <button
                            className="btn btn-warning text-black"
                            onClick={() => cancelBooking(booking.id)}
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                    <label htmlFor="my_modal_6" className="btn btn-primary">
                      Confirm this Booking
                    </label>

                    <input
                      type="checkbox"
                      id="my_modal_6"
                      className="modal-toggle"
                    />
                    <div className="modal" role="dialog">
                      <div className="modal-box">
                        <h3 className="text-lg font-bold">Are you sure?</h3>
                        <p className="py-4">
                          You went to confirm this booking?
                        </p>
                        <div className="modal-action">
                          <label htmlFor="my_modal_6" className="btn">
                            Close
                          </label>
                          <label
                            htmlFor="my_modal_6"
                            className="btn btn-success text-black"
                            onClick={() => confirmBooking(booking.id)}
                          >
                            Confirm
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingDetails;
