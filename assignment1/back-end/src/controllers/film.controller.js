const db = require("../database");

// get all films from database
exports.all = async (req, res) => {
  const film = await db.film.findAll({
    include: { model: db.post, as: "posts" },
  });
  res.json(film);
};

// get film from database based on title
exports.find = async (req, res) => {
  const film = await db.film.findOne({
    where: { title: req.params.id },
    include: { model: db.post, as: "posts" },
  });
  res.json(film);
};

// update the rating of the film
exports.updateRating = async (req, res) => {
  const film = await db.film.findOne({
    where: { title: req.params.id },
    include: { model: db.post, as: "posts" },
  });
  let totalRating = 0;
  let length = 0;
  if (film.posts != 0) {
    for (const post of film.posts) {
      if (post.rating > 0) {
        totalRating += post.rating;
        length += 1;
      }
    }
    if (length > 0) {
      const averageRating = totalRating / length;
      film.rating = averageRating.toFixed(2);
    }
    else {
      film.rating =0;
    }
  } else {
    film.rating = 0;
  }
  await film.save();
  return res.json(film);
};
