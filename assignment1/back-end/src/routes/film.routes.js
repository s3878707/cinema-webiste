module.exports = (express, app) => {
    const controller = require("../controllers/film.controller.js");
    const router = express.Router();
  
    // Select all films.
    router.get("/", controller.all);

     //update rating
     router.put("/:id", controller.updateRating);

     //select films based on title
     router.get("/:id", controller.find)

    app.use("/api/film", router);
};
