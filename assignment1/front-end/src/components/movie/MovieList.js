import "./Movie.css";
import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  //sort the movie based on their averageRating
  const numDescending = [...movies].sort(
    (a, b) => b.rating - a.rating
  );
  //get the highest rating movie
  const highestRatedMovie = numDescending[0];
  return (
    <div className="movie-layout">
      <div className="hottest">
        <p>
          <strong>Hottest</strong><span>&#128293;</span>
        </p>
      </div>
      <MovieCard
        key={highestRatedMovie.film_id}
        movie={highestRatedMovie}
        isBig={true}
      />
      <div className="trending">
        <p>
          Trending<span></span>
        </p>
      </div>
      {numDescending.map((movie, key) => {
        return (
          <div className="movie-layout">
            <MovieCard  order={key+1} key={movie.film_id} movie={movie} />
          </div>
        );
      })}
    </div>
  );
}

export default MovieList;
