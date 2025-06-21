// src/types/index.ts

/**
 * @interface Movie
 * @description Defines the structure for a movie object.
 * @property {string} id - Unique identifier for the movie.
 * @property {string} title - The title of the movie.
 * @property {string} poster - URL to the movie's poster image.
 * @property {string} description - A brief description or synopsis of the movie.
 * @property {number} rating - The movie's rating on a 1-5 scale.
 */
export interface Movie {
  id: string;
  title: string;
  poster: string;
  description: string;
  rating: number; // 1-5 scale
  releaseDate: string;
  genre: string;
  language: string;
}

/**
 * @interface Showtime
 * @description Defines the structure for a movie showtime.
 * @property {string} time - The time of the show (e.g., "10:00 AM").
 * @property {number} price - The price per ticket for this showtime.
 */
export interface Showtime {
  time: string;
  price: number;
}

/**
 * @interface Seat
 * @description Defines the structure for a cinema seat.
 * @property {string} id - Unique identifier for the seat (e.g., "A1", "B10").
 * @property {string} row - The row letter of the seat.
 * @property {number} number - The seat number within the row.
 * @property {boolean} isBooked - Indicates if the seat is already booked.
 */
export interface Seat {
  id: string;
  row: string;
  number: number;
  isBooked: boolean;
}
