const { buildSchema } = require("graphql");
const db = require("../database");

const graphql = {};

// GraphQL.
// Construct a schema, using GraphQL schema language
graphql.schema = buildSchema(`
  # The GraphQL types are declared first.

  # NOTE: The owner and pet are pseudo-joined; whilst they are related, how they are related is an implementation detail
  # that is NOT exposed in the GraphQL schema. This can be seen with the Pet type which has no field linking it to
  # an owner. That said an owner has many pets and this is exposed within the GraphQL schema by association.
  # Behind the scenes the database pet table has an additional field called email which is a FK to owner.
  type User {
    user_id: Int,
    username: String,
    email: String,
    isBlocked: Boolean
    posts: [Post]
  }

  type Post {
    post_id: Int,
    content: String,
    rating: Float,
    isDeleted: Boolean
  }

  type Film {
    film_id: Int,
    title: String,
    releaseDate: String,
    poster: String,
    rating: Float,
    description: String
  }
  # The input type can be used for incoming data.
  input FilmInput {
    title: String,
    releaseDate: String,
    poster: String,
    rating: Float,
    description: String
  }
   input FilmUpdateInput {
    film_id: Int,
    releaseDate: String,
    description: String
   }
  # Queries (read-only operations).
  type Query {
    all_films: [Film],
    all_users: [User],
    all_posts: [Post],
    specific_posts(post_id: Int ): [Post]
  }

  # Mutations (modify data in the underlying data-source, i.e., the database).
  type Mutation {
    delete_post(post_id: Int): Post,
    block_user(user_id: Int): User,
    unblock_user(user_id: Int): User,
    create_film(input: FilmInput): Film,
    update_film(input: FilmUpdateInput): Film
  }
`);

// The root provides a resolver function for each API endpoint.
graphql.root = {
  // Queries.
  all_users: async () => {
    return await db.user.findAll();
  },
  all_posts: async () => {
    return await db.post.findAll();
  },

  all_films: async () => {
    return await db.film.findAll();
  },

  specific_posts: async (args) => {
    return await db.post.findByPk(args.post_id);
  },

  // Mutations.
  delete_post: async (args) => {
    const post = await db.post.findOne({ where: { post_id: args.post_id } });
    if (!post) {
      throw new Error("Post not found");
    }

    post.content = "**** This review has been deleted by the admin ***";
    post.rating = 0;
    post.isDeleted = true;
    // Save the changes to the post
    await post.save();

    // Return the updated post
    return post;
  },

  block_user: async (args) => {
    const user = await db.user.findByPk(args.user_id);

    user.isBlocked = true;

    await user.save();

    return user;
  },
  unblock_user: async (args) => {
    const user = await db.user.findByPk(args.user_id);

    user.isBlocked = false;

    await user.save();

    return user;
  },

  create_film: async (args) => {
    const film = await db.film.create(args.input);

    return film;
  },

  update_film: async (args) => {
    const film = await db.film.findByPk(args.input.film_id);

    film.releaseDate = args.input.releaseDate;
    film.description = args.input.description;
    await film.save();

    return film;
  },
};

module.exports = graphql;
