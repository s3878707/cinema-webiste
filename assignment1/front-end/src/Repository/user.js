import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:3002";
const USER_KEY = "user";

// --- User ---------------------------------------------------------------------------------------
async function verifyUser(username, password) {
  const response = await axios.get(API_HOST + "/api/users/login", { params: { username, password } });
  const user = response.data;
  // NOTE: In this example the login is also persistent as it is stored in local storage.
  if(user !== null)
     user.password = password;
    setUser(user);

  return user;
}

async function getUsers(){
  const response = await axios.get(API_HOST + `/api/users`);
  return response.data;
}

async function findUser(id) {
  const response = await axios.get(API_HOST + `/api/users/select/${id}`);

  return response.data;
}

async function findEmail(id){
  const response = await axios.get(API_HOST + `/api/users/email/${id}`);
  return response.data;
}
async function createUser(user,date) {
  user.date = date;
  const response = await axios.post(API_HOST + "/api/users", user);

  return response.data;
}

async function updateUser(id, data){
    const response = await axios.put(API_HOST + `/api/users/${id}`, data);
    const user = response.data;
    user.password = data.password;
    setUser(user);
    return user;
}

async function deleteUser(id){
  const response = await axios.delete(API_HOST + `/api/users/${id}`);
  return response.data;
}
// --- Post ---------------------------------------------------------------------------------------
async function getPosts() {
  const response = await axios.get(API_HOST + "/api/posts");

  return response.data;
}

async function createPost(post) {
  const response = await axios.post(API_HOST + "/api/posts", post);

  return response.data;
}

// --- Helper functions to interact with local storage --------------------------------------------
function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  verifyUser, findUser, createUser,
  getPosts, createPost, getUsers,
  getUser, removeUser, updateUser,
  setUser, findEmail, deleteUser
}
