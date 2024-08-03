import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:3002";

// --- User ---------------------------------------------------------------------------------------
async function createPost(post) {
  const response = await axios.post(API_HOST + "/api/posts", post);
  return response.data;
  // NOTE: In this example the login is also persistent as it is stored in local storage.
 
}

async function getPosts(id){
  const response = await axios.get(API_HOST + `/api/posts/${id}`);
  return response.data;
}

async function getPostsByFilm(id){
  const response = await axios.get(API_HOST + `/api/posts/film/${id}`);
  return response.data;
}

async function deletePost(id){
  const response = await axios.delete(API_HOST + `/api/posts/${id}`);
  return response.data;
}

async function updatePost(id, data){
  const response = await axios.put(API_HOST + `/api/posts/${id}`, data);
  return response.data;
}

export {createPost, getPosts, deletePost, updatePost, getPostsByFilm}