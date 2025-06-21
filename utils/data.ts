// src/utils/data.ts

import { Movie, Showtime, Seat } from '../types';

/**
 * @constant movies
 * @description Dummy movie data for demonstration purposes.
 * In a real application, this would come from an API.
 */
export const movies: Movie[] = [
  {
    id: '1',
    title: 'Oppenheimer',
    poster: 'https://posterspy.com/wp-content/uploads/2023/01/OPPENHEIMER_FINAL-min.jpg',
    description: 'A captivating drama about self-discovery, where a mysterious object changes lives.',
    rating: 4,
    releaseDate: null,
    genre: "Sci-Fi",
    language: "English",
  },
  {
    id: '2',
    title: 'La-La Land',
    poster: 'https://www.scrolldroll.com/wp-content/uploads/2020/01/LA-LA-Land-Must-Watch-Romantic-Hollywood-Movies-722x1024.jpg',
    description: 'An action-packed adventure through the vast, unforgiving dunes, chasing ancient legends.',
    rating: 5,
    releaseDate: null,
    genre: "Romantic",
    language: "null",
  },
  {
    id: '3',
    title: 'Devil Wears Prada',
    poster: 'https://www.themoviedb.org/t/p/original/1LwW0W0Zyik00OmQPTnCUjmCh1C.jpg',
    description: 'A heroic tale of bravery and sacrifice, following a dedicated team of first responders.',
    rating: 4,
    releaseDate: null,
    genre: "Drama",
    language: "Hindi",
  },
  {
    id: '4',
    title: 'The Unexpected Turn',
    poster: 'https://assets.website-files.com/5bf1c2ccde18dd05bd430ccc/5bf1c32c486e7f6bb6d72fd6_598191043fd40e0001129b79_horror-blog-halloween.jpeg',
    description: 'A delightful comedy of errors that takes an unforeseen twist, leaving audiences in stitches.',
    rating: 3,
    releaseDate: null,
    genre: "Horror",
    language: "null",

  },
  

  {
    id: '5',
    title: 'Hangover',
    poster: 'https://www.discountdisplays.co.uk/our-blog/wp-content/uploads/the-hangover-movie-poster.jpg',
    description: 'The cast of a space opera TV series is abducted by aliens who think their show is real.',
    rating: 4,
    releaseDate: null,
    genre: "Comedy",
    language: "null",
  },
  {
    id: '6',
    title: 'Thriller',
    poster: 'http://cdn.collider.com/wp-content/uploads/2019/04/thriller-netflix-movie-poster.png',
    description: 'A couple undergo a procedure to erase each other from their memories after a bitter breakup.',
    rating: 5,
    releaseDate: null,
    genre: "Thriller",
    language: "Punjabi",
    
  },

    {
    id: '7',
    title: 'Silver Linings Playbook',
    poster: 'https://image.tmdb.org/t/p/original/g1wfh6BLd5rthHzSdbCnykXPYvG.jpg',
    description: 'After spending eight months in a mental institution, a former teacher moves back in with his parents and tries to reconcile with his ex-wife.',
    rating: 4,
    releaseDate: "2025-07-15",
    genre: "Sci-Fi",
    language: "English",

  },
  {
    id: '8',
    title: 'Spirited Away',
    poster: 'https://placehold.co/300x450/4B5563/F9FAFB?text=MOVIE+POSTER',
    description: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.',
    rating: 5,
    releaseDate: "2025-09-23",
    genre: "null",
    language: "null",
  },
    {
    id: '9',
    title: 'The Unexpected Turn',
    poster: 'https://placehold.co/300x450/4B5563/F9FAFB?text=MOVIE+POSTER',
    description: 'A delightful comedy of errors that takes an unforeseen twist, leaving audiences in stitches.',
    rating: 3,
    releaseDate: "2025-07-12",
    genre: "null",
    language: "null",
  },
    {
    id: '10',
    title: 'The Unexpected Turn',
    poster: 'https://www.filmsourcing.com/wp-content/uploads/2013/03/werethemillers-poster.jpg',
    description: 'A delightful comedy of errors that takes an unforeseen twist, leaving audiences in stitches.',
    rating: 3,
    releaseDate: "2025-10-11",
    genre: "null",
    language: "null",
  }
];

/**
 * @constant showtimes
 * @description Dummy showtime data for movies.
 * In a real application, showtimes would likely be linked to specific movies and dates.
 */
export const showtimes: Showtime[] = [
  { time: '10:00 AM', price: 10.00 },
  { time: '01:00 PM', price: 12.00 },
  { time: '04:00 PM', price: 12.00 },
  { time: '07:00 PM', price: 15.00 },
  { time: '10:00 PM', price: 15.00 },
];

/**
 * @function generateSeats
 * @description Generates a grid of dummy cinema seats, randomly marking some as booked.
 * @returns {Seat[]} An array of Seat objects.
 */
export const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // Rows A through H
  const seatsPerRow = 10; // 10 seats in each row

  for (const row of rows) {
    for (let i = 1; i <= seatsPerRow; i++) {
      seats.push({
        id: `${row}${i}`, // Unique ID for each seat (e.g., "A1", "B5")
        row: row,
        number: i,
        isBooked: Math.random() > 0.8, // Approximately 20% of seats will be marked as booked randomly
      });
    }
  }
  return seats;
};
