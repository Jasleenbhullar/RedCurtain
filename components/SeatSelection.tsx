// src/components/SeatSelection.tsx

import React, { useState, useEffect } from 'react';
import { Movie, Seat, Showtime } from '../types'; // Import types
import { showtimes, generateSeats } from '../utils/data'; // Import data and helper

/**
 * @interface SeatSelectionProps
 * @description Props for the SeatSelection component.
 * @property {Movie} movie - The movie for which seats are being selected.
 * @property {() => void} onBack - Callback function to navigate back to the movie listing.
 */
interface SeatSelectionProps {
  movie: Movie;
  onBack: () => void;
   isLoggedIn: boolean;
}

/**
 * @function SeatSelection
 * @description A React component for selecting seats and showtimes for a given movie.
 * Displays a cinema seat layout, handles seat selection, showtime selection,
 * and simulates a booking process.
 * @param {SeatSelectionProps} { movie, onBack } - Props for the component.
 */
const SeatSelection: React.FC<SeatSelectionProps> = ({ movie, onBack,isLoggedIn }) => {
  // State to store all available seats in the cinema hall
  const [availableSeats, setAvailableSeats] = useState<Seat[]>([]);
  // State to store seats currently selected by the user
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  // State to store the currently selected showtime
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
  // State to display booking messages (e.g., success, error)
  const [bookingMessage, setBookingMessage] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');

  // Initialize seats when the component mounts
  useEffect(() => {
    setAvailableSeats(generateSeats());
  }, []);

  // Group seats by row for easier rendering in the UI
  const seatsByRow: { [key: string]: Seat[] } = availableSeats.reduce((acc, seat) => {
    (acc[seat.row] = acc[seat.row] || []).push(seat);
    return acc;
  }, {} as { [key: string]: Seat[] }); // Asserting initial type for accumulator

  /**
   * @function handleSeatClick
   * @description Handles the click event on a seat. Toggles selection or shows a message if booked.
   * @param {Seat} seat - The seat object that was clicked.
   */
  const handleSeatClick = (seat: Seat) => {
    // If the seat is already booked, show a message and prevent selection
    if (seat.isBooked) {
      setBookingMessage('This seat is already booked!');
      setTimeout(() => setBookingMessage(null), 3000); // Clear message after 3 seconds
      return;
    }

    // Check if the seat is already in the selectedSeats array
    if (selectedSeats.find((s) => s.id === seat.id)) {
      // If already selected, deselect it
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
    } else {
      // If not selected, add it to the selectedSeats
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  /**
   * @function handleBookSelectedTickets
   * @description Simulates the booking process for the selected seats and showtime.
   * Displays a confirmation message and updates seat availability.
   */
  const handleBookSelectedTickets = () => {
  if (!isLoggedIn) {
    setBookingMessage('🚫 Please log in to confirm your booking.');
    setTimeout(() => setBookingMessage(null), 3000);
    return;
  }

  if (!selectedShowtime) {
    setBookingMessage('Please select a showtime.');
    setTimeout(() => setBookingMessage(null), 3000);
    return;
  }

  if (!selectedDate) {
    setBookingMessage('📅 Please select a date.');
    setTimeout(() => setBookingMessage(null), 3000);
    return;
  }

  if (selectedSeats.length === 0) {
    setBookingMessage('Please select at least one seat.');
    setTimeout(() => setBookingMessage(null), 3000);
    return;
  }

  const totalCost = selectedSeats.length * selectedShowtime.price;
  setBookingMessage(
    `✅ Successfully booked ${selectedSeats.length} ticket(s) for ${movie.title} on ${selectedDate} at ${selectedShowtime.time}. Total: $${totalCost.toFixed(2)}. Enjoy!`
  );

  setAvailableSeats((prevSeats) =>
    prevSeats.map((seat) =>
      selectedSeats.some((s) => s.id === seat.id) ? { ...seat, isBooked: true } : seat
    )
  );
  setSelectedSeats([]);
};


  return (
    <div className="md:col-span-3 bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 w-full mx-auto">


      <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
  {/* Left - Title, Back Button, Showtime */}
  <div className="flex-1">
    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
      Book Tickets for {movie.title}
    </h2>

    <button
      onClick={onBack}
      className="mb-4 bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition duration-300 flex items-center text-sm sm:text-base"
    >
      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Back to Movies
    </button>

    <div>
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Select Showtime:</h3>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {showtimes.map((showtime, index) => (
          <button
            key={index}
            onClick={() => setSelectedShowtime(showtime)}
            className={`py-2 px-3 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition duration-300
              ${selectedShowtime?.time === showtime.time
                ? 'bg-blue-600 text-white'
                : 'bg-blue-800 text-gray-300 hover:bg-blue-500'}`}
          >
            {showtime.time} (${showtime.price.toFixed(2)})
          </button>
        ))}
      </div>

      {/* Date Selection Section */}
<div className="mt-6">
  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">📅 Select Your Date:</h3>
  <input
    type="date"
    value={selectedDate}
    onChange={(e) => setSelectedDate(e.target.value)}
    className="bg-blue-800 hover:bg-blue-500 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    min={new Date().toISOString().split('T')[0]}
  />
</div>

    </div>
  </div>

  {/* Right - Poster */}
  <div className="w-full md:w-48 flex-shrink-0">
    <img
      src={movie.poster}
      alt={movie.title}
      className="w-full h-auto rounded-md shadow-md"
      onError={(e) => {
        e.currentTarget.src = "https://placehold.co/256x384/374151/ffffff?text=No+Image";
      }}
    />
  </div>
</div>


      {/* Booking message display */}
      {bookingMessage && (
        <div className={`p-3 rounded-md mb-4 text-center text-sm sm:text-base ${bookingMessage.startsWith('Successfully') ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          {bookingMessage}
        </div>
      )}

      {/* Seat layout section */}
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Select Your Seats:</h3>
      <div className="bg-gray-700 p-4 rounded-md mb-6 relative overflow-x-auto">
        <div className="text-center text-gray-400 mb-4 text-base sm:text-lg font-medium">SCREEN THIS WAY</div>
        {/* Visual representation of the screen */}
        <div className="border-t-4 border-dashed border-gray-500 mx-auto w-3/4 mb-6"></div>
        {/* Render seats row by row */}
        {Object.entries(seatsByRow).map(([row, seatsInRow]) => (
          <div key={row} className="flex items-center justify-center mb-2">
            <span className="text-gray-300 font-bold w-6 sm:w-8 text-right pr-1 sm:pr-2 text-sm sm:text-base">{row}</span>
            <div className="flex gap-0.5 sm:gap-1">
              {seatsInRow.map((seat) => (
                <button
                  key={seat.id}
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-md flex items-center justify-center text-xs sm:text-sm font-semibold transition duration-200
                    ${seat.isBooked
                      ? 'bg-red-700 text-white cursor-not-allowed opacity-70' // Style for booked seats
                      : selectedSeats.find((s) => s.id === seat.id)
                        ? 'bg-green-500 text-white border-2 border-green-700' // Style for selected seats
                        : 'bg-gray-600 text-gray-200 hover:bg-gray-500' // Style for available seats
                    }`}
                  onClick={() => handleSeatClick(seat)}
                  disabled={seat.isBooked} // Disable button for booked seats
                >
                  {seat.number}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Booking summary and confirmation button */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-700 p-4 rounded-md mt-6 text-sm sm:text-base">
        <div className="mb-4 sm:mb-0">
          <span className="text-gray-300 mr-2">Selected:</span>
          <span className="font-bold text-white">
            {selectedSeats.length > 0 ? selectedSeats.map(s => s.id).join(', ') : 'None'}
          </span>
        </div>
        <div className="mb-4 sm:mb-0">
          <span className="text-gray-300 mr-2">Total:</span>
          <span className="font-bold text-white text-base sm:text-lg">
            ${selectedShowtime ? (selectedSeats.length * selectedShowtime.price).toFixed(2) : '0.00'}
          </span>
        </div>
        <button
          onClick={handleBookSelectedTickets}
          // Disable button if no seats or no showtime is selected
          disabled={selectedSeats.length === 0 || !selectedShowtime}
          className={`py-2 px-4 sm:py-3 sm:px-6 rounded-md font-bold transition duration-300 text-sm sm:text-base
            ${selectedSeats.length === 0 || !selectedShowtime
              ? 'bg-blue-800 text-gray-300 cursor-not-allowed' // Style for disabled button
              : 'bg-green-600 hover:bg-green-700 text-white' // Style for enabled button
            }`}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;
