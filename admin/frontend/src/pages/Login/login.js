import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
} from '@chakra-ui/react'; // Importing necessary components from Chakra UI for styling.
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation with React Router.

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initializing a navigation function for use with React Router.

  // Function to handle the login process.
  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      // Authentication successful
      navigate('/dashboard');
    } else {
      // Authentication failed, you can display an error message or take other actions
      alert('Invalid username or password');
    }
  };

  return (
    <Center h="100vh">
      <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md">
        <h1>Admin Login</h1>
        <VStack spacing={20} align="stretch">
          <HStack>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                width="120%" // Make the input element 100% wide
              />
            </FormControl>
          </HStack>
          <HStack>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                width="120%" // Make the input element 100% wide
              />
            </FormControl>
          </HStack>
          <Button colorScheme="teal" onClick={handleLogin}>
            Login
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}

export default Login; // Exporting the Login component for use in other parts of the application.
