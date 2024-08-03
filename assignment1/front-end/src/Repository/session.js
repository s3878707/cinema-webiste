import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:3002";

async function getSessions() {
  const response = await axios.get(API_HOST + `/api/sessions`);
  return response.data;
}

async function updateSlot(id, session) {
  const response = await axios.put(API_HOST + `/api/sessions/${id}/${session}`);
  return response.data;
}

async function getSession(id) {
  const response = await axios.get(API_HOST + `/api/sessions/${id}`);
  return response.data;
}

async function getOneSession(id, session) {
  const response = await axios.get(API_HOST + `/api/sessions/${id}/${session}`);
  return response.data;
}

export { getSessions, updateSlot, getSession, getOneSession };
