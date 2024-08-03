module.exports = (express, app) => {
    const controller = require("../controllers/user.controller.js");
    const router = express.Router();
  
    // Select all users.
    router.get("/", controller.all);
  
    // Select a single user with id.
    router.get("/select/:id", controller.one);

    // Select a single user with email.
    router.get("/email/:id", controller.email);
    // Select one user from the database if username and password are a match.
    router.get("/login", controller.login);

    // Update a user with id.
    router.put("/:id", controller.update);

    // Create a new user.
    router.post("/", controller.create);

    // Delete a user with id.
    router.delete("/:id", controller.remove);
  
    // Add routes to server.
    app.use("/api/users", router);
  };
  