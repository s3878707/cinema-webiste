import { request, gql } from "graphql-request";

const GRAPH_QL_URL = "http://localhost:4002/graphql";

async function getUsers() {
  const query = gql`
    {
      all_users {
        user_id
        username
        email
        isBlocked
      }
    }
  `;
  const data = await request(GRAPH_QL_URL, query);

  return data.all_users;
}

async function blockUser(user_id) {
  const query = gql`
    mutation ($user_id: Int) {
      block_user(user_id: $user_id) {
        user_id
        username
        email
        isBlocked
      }
    }
  `;

  const variables = { user_id };

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.block_user;
}

async function unblockUser(user_id) {
  const query = gql`
    mutation ($user_id: Int) {
      unblock_user(user_id: $user_id) {
        user_id
        username
        email
        isBlocked
      }
    }
  `;

  const variables = { user_id };

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.unblock_user;
}

export { getUsers, blockUser, unblockUser };
