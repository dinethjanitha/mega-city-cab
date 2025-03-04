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

const UserBookings = () => {
  const userId = localStorage.getItem("id");

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const router = useRouter();

  const fetchUserBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3005/api/v1/booking/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setBookings(response.data.sort((a, b) => new Date(b.date) - new Date(a.date)));
      
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    

    if (!selectedBooking) return;

    const updatedData = {
      ...selectedBooking,
      bookingStatus: selectedBooking.bookingStatus, // Ensure bookingStatus is not sent in the update
    };

    console.log("-----update------")
    console.log(updatedData)

    try {
      const token = localStorage.getItem("token");
      console.log("-----update------")
    console.log(updatedData)
      const response = await axios.patch(
        `http://localhost:3005/api/v1/booking/user`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);
      console.log("-----response");
      console.log(response);
      fetchUserBookings(); // Re-fetch the bookings after updating
      setSelectedBooking(null); // Close the modal
    } catch (e) {
      setError("Failed to update booking");
      console.log(e);
    }
  };

  const handleDelete = async (bookingId: string) => {
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:3005/api/v1/booking/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);
      console.log(response);
      fetchUserBookings(); // Re-fetch the bookings after deleting
    } catch (e) {
      setError("Failed to delete booking");
      console.log(e);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    
    const { name, value } = e.target;
    setSelectedBooking((prevBooking) => prevBooking ? ({
      ...prevBooking,
      [name]: value,
    }) : null);

    
  };

  console.log(selectedBooking);
  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-screen">
      <div className="mx-auto grid max-w-screen-lg px-6 pb-20">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Bookings</h1>
        {error && (
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Action completed successfully!</span>
          </div>
        )}
        <div className="grid grid-cols-1 gap-3">
          {bookings.map((booking, index) => (
            <div
              key={index}
              className="card card-side shadow-2xl bg-white rounded-lg overflow-hidden w-full max-w-4xl mx-auto"
            >
              <div className="w-1/3 bg-gradient-to-r from-green-400 to-blue-500 p-6 flex flex-col justify-center text-white">
                <div className="mb-4">
                  <span className="text-lg font-semibold">Order Status:</span>
                  <div className="badge badge-secondary ml-2">{booking.bookingStatus}</div>
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
                <div className="card-actions justify-end mt-6">
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => setSelectedBooking(booking)}
                  >
                    Update Booking
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleDelete(booking.id)}
                  >
                    Delete Booking
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedBooking && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Update Booking</h2>
            <form>
              <div className="grid gap-3">
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-blue-900 text-xl">
                      Start Destination
                    </legend>
                    <input
                      type="text"
                      name="startDestination"
                      value={selectedBooking.startDestination}
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
                      End Destination
                    </legend>
                    <input
                      type="text"
                      name="endDestination"
                      value={selectedBooking.endDestination}
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
                      Booking Time
                    </legend>
                    <input
                      type="text"
                      name="bookingTime"
                      value={selectedBooking.bookingTime}
                      onChange={handleChange}
                      className="input"
                      placeholder="HH:mm"
                      required
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-blue-900 text-xl">
                      Booking Date
                    </legend>
                    <input
                      type="date"
                      name="bookingDate"
                      value={new Date(selectedBooking.bookingDate).toISOString().split("T")[0]}
                      onChange={handleChange}
                      className="input"
                      required
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-blue-900 text-xl">
                      Note
                    </legend>
                    <textarea
                      name="note"
                      value={selectedBooking.note}
                      onChange={handleChange}
                      className="textarea h-24 w-full"
                      placeholder="Leave a note for the driver"
                    ></textarea>
                  </fieldset>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  className="btn btn-secondary mr-2"
                  onClick={() => setSelectedBooking(null)}
                >
                  Cancel
                </button>
                <button type="submit" onClick={handleUpdate} className="btn btn-primary">
                  Update Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBookings;