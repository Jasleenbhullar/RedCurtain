

import React, { useState, useEffect } from "react";
import { Movie } from "../types"; 
import { movies } from "../utils/data"; 
import { MovieCard, SeatSelection, ContactForm } from "../components"; 
import { FilmIcon } from "@heroicons/react/24/solid";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import type { User } from "firebase/auth";

interface Article {
  url: string;
  title: string;
  description?: string;
  publishedAt?: string;
  source: {
    name: string;
  };
}

const Home: React.FC = () => {
  const [currentView, setCurrentView] = useState<"movies" | "seatSelection">(
    "movies"
  );
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newsArticles, setNewsArticles] = useState<Article[]>([]);
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          "https://gnews.io/api/v4/search?q=movie&lang=en&max=6&apikey=d10e90dbb7a1308183a482f4ff46cd65"
        );
        const data = await res.json();
        setNewsArticles(data.articles || []);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Logged in user:", user.displayName);
        setUser(user);
        // Set user state
      } else {
        console.log("User logged out");
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("loggedin")) {
      url.searchParams.delete("loggedin");
      window.history.replaceState({}, document.title, url.pathname); // Remove param
      window.location.reload(); // ✅ Refresh UI to reflect login
    }
  }, []);

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) return;

    try {
      await signOut(auth);
      setUser(null);
      alert("Logged out successfully.");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert("Logged in successfully!");
      window.location.reload(); // Redirect to homepage after login
    } catch (err) {
      console.error(err);
      alert("Login failed.");
    }
  };

  const filteredMovies = movies.filter((movie) => {
    const genreMatch = selectedGenre ? movie.genre === selectedGenre : true;
    const languageMatch = selectedLanguage
      ? movie.language === selectedLanguage
      : true;
    const searchMatch = searchQuery
      ? movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return genreMatch && languageMatch && searchMatch;
  });

  const handleBookTickets = (movie: Movie) => {
    const isLoggedIn = !!user;
    if (!isLoggedIn) {
      alert("Please log in to book tickets.");
      return;
    }
    setSelectedMovie(movie);
    setCurrentView("seatSelection");
  };

  const handleBackToMovies = () => {
    setCurrentView("movies");
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-black font-sans text-gray-100 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8 p-4 bg-gray-800 rounded-lg shadow-md">
        <div className="flex justify-between w-full sm:w-auto items-center">
          <h1 className="flex items-center text-2xl sm:text-3xl font-bold text-white">
            <FilmIcon className="w-8 h-8 mr-2 text-red-600" />
            RedCurtain
          </h1>
          <div className="flex items-center space-x-4 sm:hidden">
            {user ? (
              <button
                onClick={handleLogout}
                title="Tap to logout"
                className="focus:outline-none"
              >
                <img
                  src={user.photoURL || "https://placehold.co/32x32?text=👤"}
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
              </button>
            ) : (
              <a href="/login" title="My Account">
                <UserCircleIcon className="h-7 w-7 text-gray-300 hover:text-white transition" />
              </a>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        <nav className="hidden sm:flex space-x-8 mt-4 sm:mt-0">
          <a
            href="#home"
            className="text-gray-300 hover:text-white transition duration-200 text-sm sm:text-base"
          >
            Home
          </a>
          <a
            href="#blogs"
            className="text-gray-300 hover:text-white transition duration-200 text-sm sm:text-base"
          >
            Blog
          </a>
          <a
            href="#contact"
            className="text-gray-300 hover:text-white transition duration-200 text-sm sm:text-base"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <div className="relative w-full sm:w-auto mt-4 sm:mt-0">
            <input
              type="text"
              placeholder="Search or enter movie name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 p-2 pl-10 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {user ? (
            <button
              onClick={handleLogout}
              title="Click to logout"
              className="hidden sm:flex items-center space-x-2 focus:outline-none"
            >
              <img
                src={user.photoURL || "https://placehold.co/32x32?text=👤"}
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm text-gray-300">{user.displayName}</span>
            </button>
          ) : (
            <a href="/login" title="My Account" className="hidden sm:block">
              <UserCircleIcon className="h-8 w-8 text-gray-300 hover:text-white transition" />
            </a>
          )}
        </div>
      </header>

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
      {/* Mobile-only Filter Section */}
      <section className="block sm:hidden bg-gray-800 py-6 px-4 rounded-xl shadow-md w-full mb-6">
        <h2 className="text-xl font-semibold mb-4">
          🎯 Filter by Genre & Language
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* FGenres */}
          <div>
            <h3 className="font-medium mb-2">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Sci-Fi",
                "Romantic",
                "Comedy",
                "Thriller",
                "Drama",
                "Horror",
              ].map((genre) => (
                <button
                  key={genre}
                  onClick={() =>
                    setSelectedGenre(genre === selectedGenre ? null : genre)
                  }
                  className={`px-4 py-1 rounded-full text-sm ${
                    genre === selectedGenre
                      ? "bg-blue-500 text-white"
                      : "bg-blue-800 hover:bg-blue-500 text-gray-300"
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
              {["English", "Hindi", "Punjabi", "Tamil", "Telugu"].map(
                (lang) => (
                  <button
                    key={lang}
                    onClick={() =>
                      setSelectedLanguage(
                        lang === selectedLanguage ? null : lang
                      )
                    }
                    className={`px-4 py-1 rounded-full text-sm ${
                      lang === selectedLanguage
                        ? "bg-blue-500 text-white"
                        : "bg-blue-800 hover:bg-blue-500 text-gray-300"
                    }`}
                  >
                    {lang}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area - Conditionally renders Movie Listing or Seat Selection */}
      <main
        id="home"
        className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {currentView === "movies" ? (
          <>
            {/* Left Column - Movie Listings */}
            <section id="movies" className="md:col-span-2 ">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">
                🎬 Now Showing
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Render the first 6 movies in the main grid */}
                {filteredMovies.length === 0 ? (
                  <p className="text-gray-400 text-sm sm:text-base col-span-full">
                    ❌ No matching movies found.
                  </p>
                ) : (
                  filteredMovies
                    .slice(0, 6)
                    .map((movie) => (
                      <MovieCard
                        key={movie.id}
                        movie={movie}
                        onBookTickets={handleBookTickets}
                      />
                    ))
                )}
              </div>

              {/* Featured Movie Section */}
              <div className="mt-12">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">
                  🎬 Releasing Soon
                </h2>
                <div className="mt-9 bg-gray-800 rounded-lg shadow-lg flex flex-col md:flex-row items-center py-4 px-6 sm:p-6">
                  <img
                    src={movies[6].poster} 
                    alt={movies[6].title}
                    className="w-24 h-36 sm:w-32 sm:h-48 object-cover rounded-md mb-4 md:mb-0 md:mr-6"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/128x192/4B5563/F9FAFB?text=NO+IMAGE";
                    }}
                  />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                      {movies[6].title}
                    </h3>
                    <p className="text-gray-400 text-sm sm:text-base mb-3">
                      {movies[6].description}
                    </p>

                    <p className="text-gray-300 text-sm sm:text-base mb-4">
                      Release Date:{" "}
                      <span className="font-semibold">
                        {movies[6].releaseDate}
                      </span>
                    </p>

                    <div className="flex items-center">
                      {/* Render stars for featured movie rating */}
                      {[...Array(6)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${
                            i < movies[6].rating
                              ? "text-yellow-400"
                              : "text-gray-600"
                          }`}
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
            <div className="flex flex-col space-y-4">
              {/* Filter Section */}
              <section className="hidden sm:block bg-gray-800 py-6 px-4 rounded-xl shadow-md w-full self-start mt-14">
                <h2 className="text-xl font-semibold mb-4">
                  🎯 Filter by Genre & Language
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Genres */}
                  <div>
                    <h3 className="font-medium mb-2">Genres</h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Sci-Fi",
                        "Romantic",
                        "Comedy",
                        "Thriller",
                        "Drama",
                        "Horror",
                      ].map((genre) => (
                        <button
                          key={genre}
                          onClick={() =>
                            setSelectedGenre(
                              genre === selectedGenre ? null : genre
                            )
                          }
                          className={`px-4 py-1 rounded-full text-sm ${
                            genre === selectedGenre
                              ? "bg-blue-500 text-white"
                              : "bg-blue-800 hover:bg-blue-500 text-gray-300"
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
                      {["English", "Hindi", "Punjabi", "Tamil", "Telugu"].map(
                        (lang) => (
                          <button
                            key={lang}
                            onClick={() =>
                              setSelectedLanguage(
                                lang === selectedLanguage ? null : lang
                              )
                            }
                            className={`px-4 py-1 rounded-full text-sm ${
                              lang === selectedLanguage
                                ? "bg-blue-500 text-white"
                                : "bg-blue-800 hover:bg-blue-500 text-gray-300"
                            }`}
                          >
                            {lang}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Latest Blogs & Reviews Section */}
              <section className="mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {articles.map((article, index) => (
                    <a
                      key={index}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition"
                    >
                      {article.title}
                    </a>
                  ))}
                </div>
              </section>

              {/* Blog/News Section */}
              <section
                id="blogs"
                className="bg-gray-800 py-3 px-4 rounded-xl shadow-md w-full"
              >
                <h2 className="text-xl font-semibold mb-4">
                  📰 Latest Blogs & Movie News
                </h2>

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
                        <h3 className="text-md font-semibold text-white mb-1">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-300">
                          {article.description}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          🗞 {article.source.name}
                        </p>
                      </a>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">
                      No movie news found right now.
                    </p>
                  )}
                </div>
              </section>
            </div>
          </>
        ) : (

          selectedMovie && (
            <SeatSelection
              movie={selectedMovie}
              onBack={handleBackToMovies}
              isLoggedIn={!!user} 
            />
          )
        )}
      </main>

      {/* Horizontal Contact Section at Bottom */}
      <section
        id="contact"
        className="w-full bg-gray-900 text-gray-100 mt-24 py-10 px-4 sm:px-12"
      >
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center sm:text-left">
            📬 Get in Touch
          </h2>
          <ContactForm />
        </div>
      </section>
    </div>
  );
};

export default Home;
