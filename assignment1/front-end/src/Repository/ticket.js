import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:3002";

// --- User ---------------------------------------------------------------------------------------
async function createTicket(ticket) {
  const response = await axios.post(API_HOST + "/api/tickets", ticket);
  return response.data;
  // NOTE: In this example the login is also persistent as it is stored in local storage.
 
}

async function getTickets(id){
  const response = await axios.get(API_HOST + `/api/tickets/${id}`);
  return response.data;
}

async function deleteTickets(id){
  const response = await axios.delete(API_HOST + `/api/tickets/${id}`);
  return response.data;
}

export {createTicket, getTickets, deleteTickets};