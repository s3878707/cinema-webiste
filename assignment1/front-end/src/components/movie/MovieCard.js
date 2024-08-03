import "./Movie.css";
import React, { useEffect } from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { updateRating } from "../../Repository/film";

const MovieCard = ({ movie, isBig, order }) => {
  const cardClass = isBig ? "movie-card big" : "movie-card";
  const navigate = useNavigate();
  const title = movie.title;
  useEffect(()=> {
    const update= async () => {
      await updateRating(title);
    }
    update();
  },[])
  //change handler will direct to the feedback page of this film
  function handleClick() {
    navigate("/review", { state: title });
  }
  return (
    <div className={cardClass}>
      <div className="order">
        {order}
      </div>
      <div className="img-container">
        <img src={movie.poster} alt={`${movie.title} Poster`} />
      </div>
      <Link to={`/movie/${movie.film_id}`} style={{ textDecoration: "none" }}>
      <h2>{movie.title}</h2>
     </Link>
      <p>
        {movie.rating} / 5<span style={{ color: "gold" }}>&#9733;</span>
      </p>
      <p>{movie.releaseDate}</p>
      
      <div className="movie-form-member">
        <Button onClick={handleClick}>Feedback</Button>
      </div>
    </div>
  );
};

export default MovieCard;
