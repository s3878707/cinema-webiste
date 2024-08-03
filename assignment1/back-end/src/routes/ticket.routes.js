module.exports = (express, app) => {
  const controller = require("../controllers/ticket.controller.js");
  const router = express.Router();

  // Select all tickets.
  router.get("/", controller.all);

  //Select all tickets from movie
  router.get("/:id", controller.find);

  // Create a new ticket.
  router.post("/", controller.create);

  router.delete("/:id", controller.remove);

  // Add routes to server.
  app.use("/api/tickets", router);
};
