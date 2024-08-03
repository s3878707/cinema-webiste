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
import { createFilm } from "../../repository/film"; // Importing a function for creating a new film entry.
const NewFilm = () => {
  const [fields, setFields] = useState({ releaseDate: "", description: "", title: "", poster: "" }); // Initializing state for input fields.

  const navigate = useNavigate();
  // Function to handle input field changes.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Function to handle form submission for creating a new film entry.
  const handleSubmit = async () => {
    fields.rating = 0;
    await createFilm(fields);
    navigate("/films");
  };
  // Function to handle canceling the creation .
  const handleCancel = () => {
    // Optionally, you can reset the input values or navigate back to the previous page
    navigate("/films");
  };

  return (
    <Flex direction="column" h="100vh">
      <ChakraProvider>
        <Box p={4}>
          <Text fontSize="3xl" fontWeight="bold" mb={4} color="white">
            Create a new film here
          </Text>
          <Text fontSize="xl" fontWeight="semibold" color="white">
            Title:
          </Text>
          <Input
            color={"white"}
            type="text"
            name="title"
            value={fields.title}
            onChange={handleChange}
          />
          <Text fontSize="xl" fontWeight="semibold" color="white">
            Release Date:
          </Text>
          <Input
            color={"white"}
            type="text"
            name="releaseDate"
            value={fields.releaseDate}
            onChange={handleChange}
          />

          <Text fontSize="xl" fontWeight="semibold" color="white">
            Description
          </Text>
          <Input
            color={"white"}
            type="text"
            name="description"
            value={fields.description}
            onChange={handleChange}
          />
          <Text fontSize="xl" fontWeight="semibold" color="white">
            Poster
          </Text>
          <Input
            color={"white"}
            type="text"
            name="poster"
            value={fields.poster}
            onChange={handleChange}
          />
          <Button
            colorScheme="blue"
            mt={4}
            onClick={() => {
              handleSubmit();
            }}
          >
            Update
          </Button>
          <Button colorScheme="red" mt={4} onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </ChakraProvider>
    </Flex>
  );
};

export default NewFilm;  // Exporting the NewFilm component for use in other parts of the application.
