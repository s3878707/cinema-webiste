import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Importing useParams to get parameters from the URL.
import {
  ChakraProvider,
  Box,
  Text,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react"; // Importing necessary components from Chakra UI for styling.
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation.
import { getFilms, updateFilm } from "../../repository/film"; // Importing functions for fetching and updating film data.
const MovieDescription = () => {
  const [fields, setFields] = useState({ releaseDate: "", description: "" }); // Initializing state for input fields.
  const { film_id } = useParams(); // Getting the film_id parameter from the URL.
  const [movie, setMovie] = useState(null); // Initializing state for the selected movie.
  // Function to fetch movie data based on the film_id 
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
  const navigate = useNavigate();
// Function to handle input field changes.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Function to handle updating movie data.
  const handleUpdate = async () => {
    fields.film_id = movie.film_id;
    await updateFilm(fields);
      navigate("/films");
  };
   // Function to handle canceling the update (optionally, you can reset input values or navigate back).
  const handleCancel = () => {
    
    navigate("/films");
  };

  return (
    <Flex direction="column" h="100vh">
      {movie === null ? (
        <div>
          <p>Loading ...</p>
        </div>
      ) : (
        <ChakraProvider>
          <Box p={4}>
            <Text fontSize="3xl" fontWeight="bold" mb={4} color="white">
              {movie.title}
            </Text>
            <Text fontSize="xl" fontWeight="semibold" color="white">
              Release Date:
            </Text>
            <Input
              color={"white"}
              type="text"
              name = "releaseDate"
              value={fields.releaseDate}
              onChange={handleChange}
            />

            <Text fontSize="xl" fontWeight="semibold" color="white">
              Description
            </Text>
            <Input
              color={"white"}
              type="text"
              name = "description"
              value={fields.description}
              onChange={handleChange}
            />
            <Button
              colorScheme="blue"
              mt={4}
              onClick={() => {
                handleUpdate();
              }}
            >
              Update
            </Button>
            <Button colorScheme="red" mt={4} onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </ChakraProvider>
      )}
    </Flex>
  );
};

export default MovieDescription; // Exporting the MovieDescription component for use in other parts of the application.
