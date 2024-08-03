import React, { useEffect, useState } from "react";
import { Flex, Box, Button, Center, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getPosts, deletePost } from "../../repository/post";

import NavigationBar from "../../components/Nav/Nav";

function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  async function fetchReviews() {
    const reviewsData = await getPosts();
    setReviews(reviewsData);
  }
  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    const unsuitableWords = ["shit", "fuck"]; // Add more words as needed

    const filetered = reviews.filter((review) => {
      const content = review.content.toLowerCase(); // Convert to lowercase for case-insensitive matching

      // Use a regular expression to match any of the unsuitable words
      const regex = new RegExp(unsuitableWords.join("|"), "g");

      // Check if the content contains any of the unsuitable words
      return regex.test(content);
    });
    setFilteredReviews(filetered);
  }, [reviews]);

  // Define a function to handle review deletion
  const handleDeleteReview = async (review) => {
    await deletePost(review.post_id);
    await fetchReviews();
    // Call the DELETE_REVIEW mutation to delete the review
    // Implement the actual mutation logic here
  };

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  return (
    // <Center h="100vh" flexDirection="column" alignItems="flex-start">
    <Flex direction="column" h="100vh">
      <NavigationBar />
      <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="100%">
        <h1>Admin Reviews Management</h1>
        <SimpleGrid columns={4} spacing={4}>
          <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md">
            <h2>Post ID</h2>
          </Box>
          <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md">
            <h2>Content</h2>
          </Box>
          <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md">
            <h2>Rating</h2>
          </Box>
          <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md">
            <h2>Edit</h2>
          </Box>
        </SimpleGrid>
        {filteredReviews.map((review, key) => (
          <SimpleGrid
            columns={4}
            spacing={4}
            // key={review.id}
          >
            <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md">
              {review.post_id}
            </Box>
            <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md">
              {review.content}
            </Box>
            <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md">
              {review.rating}
            </Box>
            <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md">
              <Button
                colorScheme="teal"
                onClick={() => handleDeleteReview(review)}
              >
                Delete
              </Button>
            </Box>
          </SimpleGrid>
        ))}
      </Box>
      {/* </Center> */}
    </Flex>
  );
}

export default AdminReviews;
