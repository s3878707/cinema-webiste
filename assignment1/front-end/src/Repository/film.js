import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:3002";

async function getFilms() {
  const response = await axios.get(API_HOST + `/api/film`);
  return response.data;
}

async function updateRating(id) {
  const response = await axios.put(API_HOST + `/api/film/${id}`);
  return response.data;
}

async function getFilm(id){
  const response = await axios.get(API_HOST + `/api/film/${id}`);
  return response.data;
}

export { getFilms, updateRating, getFilm};
