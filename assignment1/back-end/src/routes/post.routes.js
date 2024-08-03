module.exports = (express, app) => {
  const controller = require("../controllers/post.controller.js");
  const router = express.Router();

  // Select all posts.
  router.get("/", controller.all);

  //Select all posts from username
  router.get("/:id", controller.find);

  //Select all posts from film
  router.get("/film/:id", controller.findByFilm);

  // Create a new post.
  router.post("/", controller.create);

  //update review
  router.put("/:id", controller.update);

  // Delete a review with post id.
  router.delete("/:id", controller.remove);

  // Add routes to server.
  app.use("/api/posts", router);
};
