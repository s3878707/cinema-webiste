import React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Center,
  Stack,
  Image,
  Flex,
  Button,
} from "@chakra-ui/react"; // Importing necessary components from Chakra UI for styling.
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation.
import { getFilms } from "../../repository/film"; // Importing a function to fetch film data from a repository.
import { useState, useEffect } from "react"; // Importing useState and useEffect for managing state and performing side effects.
import NavigationBar from "../../components/Nav/Nav"; // Importing a navigation bar component.

function Films() {
  const navigate = useNavigate(); // Initializing a navigation function for use with React Router.
  const [films, setFilms] = useState([]); // Initializing a state variable to store film data.
  // Function to fetch films data when the component mounts.
  async function fecthFilms() {
    const filmsData = await getFilms(); // Fetching film data using the getFilms function.
    setFilms(filmsData); // Updating the state with the fetched film data.
  }

  // Use useEffect to fetch films when the component mounts .
  useEffect(() => {
    fecthFilms();
  }, []);
   // Function to handle clicking the "Edit" button for a specific film.
  function handleEditClick(film_id) {
    navigate(`/film/${film_id}`);
  }
  return (
    <ChakraProvider>
        < NavigationBar /> {/* Rendering a navigation bar component. */}
      <Flex direction="column" h="120vh">
        <Box p={4}>
          <Text fontSize="3xl" fontWeight="bold" mb={4} color="white">
            Movie List
          </Text>
          <Button
            colorScheme="blue"
            size="sm"
            mt={4}
            onClick={() =>  navigate(`/newfilm`) }
          >
            Create new film
          </Button>
          {films.length === 0 ? (
            <div>
              <p>Loading ...</p>
            </div>
          ) : (
            <div>
              <Flex flexWrap="wrap">
                {films.map((film, index) => (
                  <Box
                    key={index}
                    p={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    boxShadow="md"
                    minW="300px"
                    maxW="400px" // Increase the maximum width to make the boxes wider
                    flex="1"
                    margin="1rem"
                    bg="gray.700"
                  >
                    <Image src={film.poster} alt={film.title} />
                    <Text
                      fontSize="xl"
                      fontWeight="semibold"
                      mt={2}
                      color="white"
                    >
                      {film.title}
                    </Text>
                    <Text fontSize="md" color="white">
                      Released in {film.releaseDate}
                    </Text>
                    <Button
                      colorScheme="blue"
                      size="sm"
                      mt={4}
                      onClick={() => handleEditClick(film.film_id)}
                    >
                      Edit
                    </Button>
                  </Box>
                ))}
              </Flex>
            </div>
          )}
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default Films; // Exporting the Films component for use in other parts of the application.
