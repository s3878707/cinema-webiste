module.exports = (express, app) => {
  const controller = require("../controllers/session.controller.js");
  const router = express.Router();

  // Select all sessions.
  router.get("/", controller.all);

  //update slot
  router.put("/:id/:session", controller.updateSlot);

  router.get("/:id", controller.find);

  router.get("/:id/:session",controller.findSession)


  app.use("/api/sessions", router);
};
