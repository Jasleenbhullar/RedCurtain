// src/pages/index.tsx

import React, { useState , useEffect} from 'react';
import { Movie } from '../types'; // Import the Movie type
import { movies } from '../utils/data'; // Import dummy movie data
import { MovieCard, SeatSelection } from '../components'; // Import components
import { FilmIcon } from '@heroicons/react/24/solid';

/**
 * @function Home
 * @description The main page component for the movie ticket booking system.
 * Manages the view state (movie listing or seat selection) and
 * renders the appropriate components.
 */
const Home: React.FC = () => {
  // State to manage the current view: 'movies' (default) or 'seatSelection'
  const [currentView, setCurrentView] = useState<'movies' | 'seatSelection'>('movies');
  // State to hold the movie object that the user selected for booking
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');


    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newsArticles, setNewsArticles] = useState([]);


useEffect(() => {
  const fetchNews = async () => {
    try {
      const res = await fetch(
        'https://gnews.io/api/v4/search?q=movie&lang=en&max=3&apikey=d10e90dbb7a1308183a482f4ff46cd65'
      );
      const data = await res.json();
      setNewsArticles(data.articles || []);
    } catch (err) {
      console.error('Failed to fetch news:', err);
    }
  };

  fetchNews();
}, []);


  /**
   * @function handleBookTickets
   * @description Callback function passed to MovieCard.
   * Sets the selected movie and switches the view to seat selection.
   * @param {Movie} movie - The movie object for which tickets are to be booked.
   */
  const handleBookTickets = (movie: Movie) => {
    setSelectedMovie(movie);
    setCurrentView('seatSelection');
  };

  /**
   * @function handleBackToMovies
   * @description Callback function passed to SeatSelection.
   * Clears the selected movie and switches the view back to the movie listing.
   */
  const handleBackToMovies = () => {
    setSelectedMovie(null);
    setCurrentView('movies');
  };

  return (
    <div className="min-h-screen bg-black font-sans text-gray-100 p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8 p-4 bg-gray-800 rounded-lg shadow-md">
  <div className="flex justify-between w-full sm:w-auto items-center">
   <h1 className="flex items-center text-2xl sm:text-3xl font-bold text-white">
  <FilmIcon className="w-8 h-8 mr-2 text-red-600" />
  RedCurtain
</h1>


    {/* Hamburger Icon */}
    <div className="sm:hidden">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-gray-300 hover:text-white focus:outline-none"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </div>

  {/* Desktop Nav */}
  <nav className="hidden sm:flex space-x-6 mt-4 sm:mt-0">
    <a href="#home" className="text-gray-300 hover:text-white transition duration-200 text-sm sm:text-base">Home</a>
    <a href="#movies" className="text-gray-300 hover:text-white transition duration-200 text-sm sm:text-base">Movies</a>
    <a href="#blogs" className="text-gray-300 hover:text-white transition duration-200 text-sm sm:text-base">Blog</a>
    <a href="#contact" className="text-gray-300 hover:text-white transition duration-200 text-sm sm:text-base">Contact</a>
  </nav>

  {/* Search Input (unchanged) */}
  <div className="relative w-full sm:w-auto mt-4 sm:mt-0">
    <input
      type="text"
      placeholder="Search or enter movie name"
      className="w-full sm:w-64 p-2 pl-10 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
    />
    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </div>
</header>

{/* Mobile Nav Dropdown */}
{isMenuOpen && (
  <div className="sm:hidden bg-gray-800 rounded-md shadow-md px-4 py-3 space-y-2 mb-4 animate-fade-in-down">
    <a
      href="#home"
      className="block text-gray-300 hover:text-white text-sm"
      onClick={() => setIsMenuOpen(false)}
    >
      Home
    </a>
    <a
      href="#movies"
      className="block text-gray-300 hover:text-white text-sm"
      onClick={() => setIsMenuOpen(false)}
    >
      Movies
    </a>
    <a
      href="#blogs"
      className="block text-gray-300 hover:text-white text-sm"
      onClick={() => setIsMenuOpen(false)}
    >
      Blog
    </a>
    <a
      href="#contact"
      className="block text-gray-300 hover:text-white text-sm"
      onClick={() => setIsMenuOpen(false)}
    >
      Contact
    </a>
  </div>
)}



      {/* Main Content Area - Conditionally renders Movie Listing or Seat Selection */}
      <main id="home" className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentView === 'movies' ? (
          <>
            {/* Left Column - Movie Listings */}
            <section id="movies" className="md:col-span-2">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">Now Showing</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Render the first 6 movies in the main grid */}
{movies
  .filter((movie) => {
    const genreMatch = selectedGenre ? movie.genre === selectedGenre : true;
    const languageMatch = selectedLanguage ? movie.language === selectedLanguage : true;
    return genreMatch && languageMatch;
  })
  .slice(0, 6) // Optional limit
  .map((movie) => (
    <MovieCard key={movie.id} movie={movie} onBookTickets={handleBookTickets} />
  ))}


              </div>

              {/* Featured Movie Section */}
              <div className="mt-12">
  <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">🎬 Releasing Soon</h2>
              <div className="mt-8 bg-gray-800 rounded-lg shadow-lg flex flex-col md:flex-row items-center p-4 sm:p-6">
                <img
                  src={movies[6].poster} // Assuming the 5th movie is the featured one
                  alt={movies[6].title}
                  className="w-24 h-36 sm:w-32 sm:h-48 object-cover rounded-md mb-4 md:mb-0 md:mr-6"
                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/128x192/4B5563/F9FAFB?text=NO+IMAGE'; }}
                />
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">{movies[6].title}</h3>
                  <p className="text-gray-400 text-sm sm:text-base mb-3">{movies[6].description}</p>

                  <p className="text-gray-300 text-sm sm:text-base mb-4">
                    Release Date: <span className="font-semibold">{movies[6].releaseDate}</span>
                          </p>


                  <div className="flex items-center">
                    {/* Render stars for featured movie rating */}
                    {[...Array(6)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${i < movies[6].rating ? 'text-yellow-400' : 'text-gray-600'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.803 2.034a1 1 0 00-.324 1.157l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.803-2.034a1 1 0 00-1.176 0l-2.803 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.324-1.157L2.94 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  {/* Book button for featured movie */}
                  <button
                    className="mt-4 bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition duration-300 text-sm sm:text-base"
                    onClick={() => handleBookTickets(movies[6])}
                  >
                    Book Tickets
                  </button>
                </div>
              </div>
                    </div>
            </section>
           

           {/* Right Column - Sidebar */}
<div className="space-y-8">
  {/* Filter Section */}
  <section className="bg-gray-800 py-6 px-4 rounded-xl shadow-md w-full">
    <h2 className="text-xl font-semibold mb-4">🎯 Filter by Genre & Language</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* Genres */}
      <div>
        <h3 className="font-medium mb-2">Genres</h3>
        <div className="flex flex-wrap gap-2">
         {['Sci-Fi', 'Romantic', 'Comedy', 'Thriller', 'Drama', 'Horror'].map((genre) => (
  <button
    key={genre}
    onClick={() => setSelectedGenre(genre === selectedGenre ? null : genre)}
    className={`px-4 py-1 rounded-full text-sm ${
      genre === selectedGenre
        ? 'bg-blue-500 text-white'
        : 'bg-blue-800 hover:bg-blue-500 text-gray-300'
    }`}
  >
    {genre}
  </button>
))}

        </div>
      </div>

      {/* Languages */}
      <div>
        <h3 className="font-medium mb-2">Languages</h3>
        <div className="flex flex-wrap gap-2">
        {['English', 'Hindi', 'Punjabi', 'Tamil', 'Telugu'].map((lang) => (
  <button
    key={lang}
    onClick={() => setSelectedLanguage(lang === selectedLanguage ? null : lang)}
    className={`px-4 py-1 rounded-full text-sm ${
      lang === selectedLanguage
        ? 'bg-blue-500 text-white'
        : 'bg-blue-800 hover:bg-blue-500 text-gray-300'
    }`}
  >
    {lang}
  </button>
))}

        </div>
      </div>
    </div>
  </section>

  {/* Blog/News Section */}
  <section id="blogs" className="bg-gray-800 py-6 px-4 rounded-xl shadow-md w-full">
    <h2 className="text-xl font-semibold mb-4">📰 Latest Blogs & Movie News</h2>

    <div className="space-y-4">
      {/* Blog Post 1 */}
{newsArticles.length > 0 ? (
    newsArticles.map((article, index) => (
      <a
        key={index}
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition"
      >
        <h3 className="text-md font-semibold text-white mb-1">{article.title}</h3>
        <p className="text-sm text-gray-300">{article.description}</p>
        <p className="text-xs text-gray-400 mt-2">🗞 {article.source.name}</p>
      </a>
    ))
  ) : (
    <p className="text-sm text-gray-400">No movie news found right now.</p>
  )}
    </div>
  </section>
</div>



          </>
        ) : (
          // Render SeatSelection component if currentView is 'seatSelection' and a movie is selected
          selectedMovie && <SeatSelection movie={selectedMovie} onBack={handleBackToMovies} />
        )}
      </main>

{/* Horizontal Contact Section at Bottom */}
<section id="contact" className="w-full bg-gray-900 text-gray-100 mt-24 py-10 px-4 sm:px-12">
  <div className="max-w-screen-xl mx-auto">
    <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center sm:text-left">📬 Get in Touch</h2>

    <form className="grid  gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Name */}
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-1 text-sm">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Your Name"
          className="px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col">
        <label htmlFor="phone" className="mb-1 text-sm">Phone</label>
        <input
          type="tel"
          id="phone"
          placeholder="9876543210"
          className="px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1 text-sm">Email</label>
        <input
          type="email"
          id="email"
          placeholder="you@example.com"
          className="px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

         {/* ticket no.  */}
      <div className="flex flex-col">
        <label htmlFor="ticket" className="mb-1 text-sm">Ticket-No.</label>
        <input
          type="ticket"
          id="ticket"
          placeholder="TX123050"
          className="px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
      {/* Query Message - spans full width */}
      <div className="sm:col-span-2 lg:col-span-4">
        <label htmlFor="message" className="mb-1 text-sm block">Your Query</label>
        <textarea
          id="message"
          rows={4}
          placeholder="Enter your message or query..."
          className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        ></textarea>
      </div>

          {/* Submit Button */}
      <div className="flex items-end">
        <button
          type="submit"
          className="w-full bg-blue-800 hover:bg-blue-500 transition duration-300 text-white font-medium px-6 py-2 rounded-md text-sm"
        >
          Send
        </button>
      </div>
    </form>
  </div>
</section>




    </div>
  );
};

export default Home;
