import { request, gql } from "graphql-request";

const GRAPH_QL_URL = "http://localhost:4002/graphql";

async function getPosts() {
  const query = gql`
    {
      all_posts {
        post_id,
        content,
        rating
      }
    }
  `;
  const data = await request(GRAPH_QL_URL, query);

  return data.all_posts;
}

// async function getSpecificPost(post_id) {
//   const query = gql`
//     query ($post_id: Int) {
//       specific_posts(post_id: $post_id ) {
//         post_id,
//         content,
//         rating
//       }
//     }
//   `;

//   const variables = post_id;

//   const data = await request(GRAPH_QL_URL, query, variables);

//   return data.specific_posts;
// }

async function deletePost(post_id) {
    const query = gql`
      mutation ($post_id: Int) {
        delete_post(post_id: $post_id) {
            post_id,
            content,
            rating
        }
      }
    `;
  
    const variables = {post_id};
  
    const data = await request(GRAPH_QL_URL, query, variables);
  
    return data.delete_post;
  }

  export {getPosts, deletePost}
