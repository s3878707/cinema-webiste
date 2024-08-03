import React, { useEffect, useState } from 'react';
import { Box, Center, Heading, VStack } from '@chakra-ui/react';
import { getTickets } from '../../Repository/ticket';
import { getUser } from '../../Repository/user';
const MyTickets = () => {
  const user = getUser();
  const [tickets, setTickets] = useState([]);
  useEffect(()=>{
    fecthTicket();
  },[])
  const fecthTicket = async () => {
    const ticketData = await getTickets(user.username);
    setTickets(ticketData);
  }
  return (
    <Center >
      <Box p={5} width="40%" margin="0 auto">
        <Heading as="h1" size="xl" mb={4} align="Center">
          My Tickets
        </Heading>
        <VStack spacing={6} align="start">
          {tickets.map((ticket) => (
            

            <Box
              key={ticket.ticket_id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              boxShadow="md"
              width="100%"
              backgroundColor="#deb992"
              alignContent="center"
              >
              <Heading as="h2" size="lg" color="#051622">
                {ticket.session.film.title}
              </Heading>
              <p color="#051622">Quantity: {ticket.quantity}</p> 
              <p color="#051622">Session: {ticket.session.session}</p>  
            </Box>
            
          ))}
        </VStack>
      </Box>
    </Center>
  );
};

export default MyTickets;
