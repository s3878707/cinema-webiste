import React from "react";
import MovieList from "../../components/movie/MovieList";
import ReleaseComponent from "../../components/movie/Release";
import { getFilms } from "../../Repository/film";
import { useState, useEffect } from "react";
const Home = () => {
  useEffect(() => {
    fetchMovies();
  }, []);
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const movieData = await getFilms();
    setMovies(movieData);
  };

  return (
    <div className="home">
      <h1>Welcome to Loop Cinemas</h1>
      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <p>Loading movies...</p>
      )}
      <ReleaseComponent />
    </div>
  );
};

export default Home;
