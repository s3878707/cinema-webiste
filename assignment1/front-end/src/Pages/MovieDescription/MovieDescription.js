import React, { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Box, Image, Text, Heading, Flex, Select } from "@chakra-ui/react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { getFilms } from "../../Repository/film";
import {
  getSession,
  getOneSession,
  updateSlot,
} from "../../Repository/session";
import { createTicket } from "../../Repository/ticket";
import { getUser } from "../../Repository/user";
const MovieDescription = () => {
  const user = getUser();
  const { film_id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null); // Initialize movie as null
  const [sessions, setSessions] = useState([]);
  const [fields, setFields] = useState({ session: "", quantity: 0 });
  const [slot, setSlot] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchMovie = async () => {
    const movieData = await getFilms();
    const foundMovie = movieData.find(
      (movie) => movie.film_id === parseInt(film_id, 10)
    );
    setMovie(foundMovie); // Set the found movie
  };

  useEffect(() => {
    fetchMovie();
  }, [film_id]);
  useEffect(() => {
    if (movie) {
      const fecthSessions = async () => {
        const sessionsData = await getSession(movie.title);
        setSessions(sessionsData);
      };
      fecthSessions();
    }
  }, [movie]);
  const fetchSlot = async () => {
    const slotData = await getOneSession(movie.title, fields.session);
    setSlot(slotData.slot);
  };
  useEffect(() => {
    if (movie) {
      fetchSlot();
    }
  }, [fields.session, movie]);
  if (!movie) {
    return <div>Loading...</div>;
  }

  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    setFields((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    if (fields.session === "" || fields.quantity === 0) {
      setErrorMessage("Please select a session time/ a quantity of ticket");
      return;
    }
    if (fields.quantity > slot || fields.quantity < 0) {
      setErrorMessage("Please select a valid number of ticket");
      return;
    }
    fields.username = user.username;
    fields.title = movie.title;
    await createTicket(fields);
    await updateSlot(movie.title, fields.session);
    await fetchSlot();
    alert("Reserve successfully !");
  };

  return (
    <Box p={4}>
      <Flex direction="column" alignItems="center">
        <Heading as="h2" size="xl" mb={4}>
          {movie.title}
        </Heading>
        <Image
          src={movie.poster}
          alt={`${movie.title} Poster`}
          width="80%"
          mb={4}
        />
        <Text fontSize="lg" mb={4}>
          Release Date: {movie.releaseDate}
        </Text>
        {user !== null ? (
          <div>
            <Text fontSize="lg" mb={2}>
              Time:
            </Text>
            <Select
              name="session"
              placeholder="Select a date"
              value={fields.session}
              onChange={handleInputChange}
              mb={4}
            >
              {sessions.map((session) => (
                <option key={session.session} value={session.session}>
                  {session.session}
                </option>
              ))}
            </Select>

            <Text fontSize="lg" mb={2}>
              Ticket: {slot}
            </Text>
            {slot === 0 ? (
              <div>
                <h1>Run out of tickets</h1>
              </div>
            ) : (
              <div>
                <Box p={4}>
                  <Flex direction="column">
                    <div>
                      <input
                        type="number"
                        name="quantity"
                        value={fields.quantity}
                        onChange={handleInputChange}
                        placeholder="Enter the quantity of tickets"
                      ></input>
                    </div>
                    <Flex marginTop="9" justifyContent="space-between">
                      <Button
                        style={{ backgroundColor: "grey", width: "150%" }}
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        Back
                      </Button>
                      <Button style={{ width: "100%" }} onClick={handleSubmit}>
                        Process
                      </Button>
                    </Flex>
                  </Flex>
                  <div>
                    {errorMessage !== null && (
                      <div className="form-group">
                        <span style={{ color: "red" }}>{errorMessage}</span>
                      </div>
                    )}
                  </div>
                </Box>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h1>
              You review as <span>Guest</span>
            </h1>
          </div>
        )}
        <Text textAlign="left">{movie.description}</Text>
      </Flex>
    </Box>
  );
};

export default MovieDescription;
