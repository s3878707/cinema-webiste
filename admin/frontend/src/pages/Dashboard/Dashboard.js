import React from 'react';
import { Box, Button, Center, SimpleGrid } from '@chakra-ui/react'; // Importing necessary components from Chakra UI.
import { Link, useNavigate } from 'react-router-dom'; // Importing Link for routing and useNavigate for navigation.

function Dashboard() {
  const navigate = useNavigate(); // Initializing a navigation function for use with React Router.

  return (
    <Center h="100vh" flexDirection="column">
      <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="100%">
        <h1>Admin Dashboard</h1>
        <SimpleGrid columns={4} spacing={4}>
          <Box p={20} shadow="lg" borderWidth="1px" borderRadius="md">
            
            <Link to="/adminreviews"><h2>Reviews</h2></Link> {/* Creating a link to the "adminreviews" route with a label "Reviews". */}
          </Box>
          <Box p={20} shadow="lg" borderWidth="1px" borderRadius="md">
            
            <Link to="/adminusers"><h2>Users</h2></Link> {/* Creating a link to the "adminusers" route with a label "Users". */}
          </Box>
          <Box p={20} shadow="lg" borderWidth="1px" borderRadius="md">
            
            <Link to="/analytics"><h2>Analytics</h2></Link> {/* Creating a link to the "analytics" route with a label "Analytics". */}
          </Box>
          <Box p={20} shadow="lg" borderWidth="1px" borderRadius="md">
            
            <Link to="/films"><h2>Films</h2></Link>  {/* Creating a link to the "films" route with a label "Films". */}
          </Box>
        </SimpleGrid>
      </Box>
      <Center mt={20}>
        <Button colorScheme="teal">
          <Link to="/">Logout</Link> {/* Creating a link to the home route (likely the login page) with a label "Logout". */}
        </Button>
      </Center>
    </Center>
  );
}

export default Dashboard;
