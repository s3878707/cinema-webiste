import React from "react";
import { Box, Button, Center, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getUsers, blockUser, unblockUser } from "../../repository/user";
import NavigationBar from "../../components/Nav/Nav";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  async function fetchUsers() {
    const usersData = await getUsers();
    setUsers(usersData);
  }
  useEffect(() => {
    fetchUsers();
  }, []);
  // Block user when click the button
  const handleBlockUser = async (user_id) => {
    await blockUser(user_id);
    await fetchUsers();
  };

  // Unblock user when click the button
  const handleUnblockUser = async (user_id) => {
    unblockUser(user_id);
    await fetchUsers();
  };

  return (
    // <Center h="100vh" flexDirection="column">
    <Flex direction="column" h="100vh">
      <NavigationBar />
      <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="100%">
        <h1>Admin User Management</h1>
      </Box>
      <SimpleGrid columns={3} spacing={7}>
        <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md">
          <h2>Username</h2>
        </Box>

        <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md">
          <h2>Status</h2>
        </Box>
        <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md">
          <h2>Action</h2>
        </Box>
      </SimpleGrid>
      {/* {data.users.map((user) => ( */}
      {users.map((user) => (
        <SimpleGrid columns={3} spacing={5} key={user.user_id}>
          <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md">
            {user.username}
          </Box>
          <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md">
            {user.isBlocked ? "Blocked" : "Available"}
          </Box>
          <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md">
            <Button
              colorScheme={user.isBlocked ? "teal" : "red"}
              onClick={() =>
                user.isBlocked
                  ? handleUnblockUser(user.user_id)
                  : handleBlockUser(user.user_id)
              }
            >
              {user.isBlocked ? "Unblock" : "Block"}
            </Button>
          </Box>
        </SimpleGrid>
      ))}
      {/* </Center> */}
    </Flex>
  );
}

export default AdminUsers;
