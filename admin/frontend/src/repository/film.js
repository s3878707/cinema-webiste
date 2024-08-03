import { request, gql } from "graphql-request";

const GRAPH_QL_URL = "http://localhost:4002/graphql";

async function getFilms() {
  const query = gql`
    {
      all_films {
        film_id
        title
        releaseDate
        poster
        rating
        description
      }
    }
  `;
  const data = await request(GRAPH_QL_URL, query);

  return data.all_films;
}

async function createFilm(film) {
  const query = gql`
    mutation (
      $title: String
      $releaseDate: String
      $poster: String
      $rating: Float
      $description: String
    ) {
      create_film(
        input: {
          title: $title
          releaseDate: $releaseDate
          poster: $poster
          rating: $rating
          description: $description
        }
      ) {
        title
        releaseDate
        poster
        rating
        description
      }
    }
  `;

  const variables = film;

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.create_film;
}

async function updateFilm(film) {
  const query = gql`
    mutation (
        $film_id: Int
      $releaseDate: String
      $description: String
    ) {
      update_film(
        input: {
          film_id: $film_id
          releaseDate: $releaseDate
          description: $description
        }
      ) {
        title
        releaseDate
        poster
        rating
        description
      }
    }
  `;

  const variables = film;

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.update_film;
}

export { getFilms, createFilm, updateFilm };
