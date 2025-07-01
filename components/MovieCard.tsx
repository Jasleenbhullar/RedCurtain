

import React from 'react';
import { Movie } from '../types'; // Import the Movie interface

/**
 * @interface MovieCardProps
 * @description Props for the MovieCard component.
 * @property {Movie} movie - The movie object to display.
 * @property {(movie: Movie) => void} onBookTickets - Callback function when the "Book Tickets" button is clicked.
 */
interface MovieCardProps {
  movie: Movie;
  onBookTickets: (movie: Movie) => void;
}

/**
 * @function MovieCard
 * @description A reusable React component to display individual movie details in a card format.
 * Includes movie poster, title, description, rating, and a booking button.
 * @param {MovieCardProps} { movie, onBookTickets } - Props for the component.
 */
const MovieCard: React.FC<MovieCardProps> = ({ movie, onBookTickets }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
      {/* Movie Poster Image */}
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-72 object-cover"
        onError={(e) => { e.currentTarget.src = 'https://placehold.co/300x450/4B5563/F9FAFB?text=NO+IMAGE'; }}
      />
      <div className="p-4">
        {/* Movie Title */}
        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">{movie.title}</h3>
        {/* Movie Description - Truncated to 3 lines */}
        <p className="text-gray-400 text-sm sm:text-base mb-3 line-clamp-3">{movie.description}</p>
        {/* Movie Rating Stars */}
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 sm:w-6 sm:h-6 ${i < movie.rating ? 'text-yellow-400' : 'text-gray-600'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.803 2.034a1 1 0 00-.324 1.157l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.803-2.034a1 1 0 00-1.176 0l-2.803 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.324-1.157L2.94 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        {/* Book Tickets Button */}
        <button
          className="mt-4 w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition duration-300"
          onClick={() => onBookTickets(movie)}
        >
          Book Tickets
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
