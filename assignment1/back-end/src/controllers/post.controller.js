const db = require("../database");

// Select all posts from the database based on username.
exports.find = async (req, res) => {
  const user = await db.user.findOne({ where: { username: req.params.id } });
  const user_id = user.user_id;
  const posts = await db.post.findAll({
    where: { user_id },
    include: [{ model: db.user }, { model: db.film }],
  });
  res.json(posts);
};

exports.findByFilm = async (req, res) => {
  const film = await db.film.findOne({ where: { title: req.params.id } });
  if (film != null) {
    const film_id = film.film_id;
    const posts = await db.post.findAll({
      where: { film_id },
      include: [{ model: db.user }, { model: db.film }],
    });
    res.json(posts);
  }
};

exports.all = async (req, res) => {
  const posts = await db.post.findAll();
  res.json(posts);
};

// Create a post in the database.
exports.create = async (req, res) => {
  const user = await db.user.findOne({
    where: { username: req.body.username },
  });
  const user_id = user.user_id;
  const film = await db.film.findOne({ where: { title: req.body.title } });
  const film_id = film.film_id;
  const post = await db.post.create({
    content: req.body.content,
    rating: req.body.rating,
    isDeleted : false,
    user_id: user_id,
    film_id: film_id,
  });
  film.addPost(post);
  user.addPost(post);
  res.json(post);
};

// Update a post in the database.
exports.update = async (req, res) => {
  const post = await db.post.findOne({ where: { post_id: req.params.id } });

  post.content = req.body.content;
  post.rating = req.body.rating;
  await post.save();
  return res.json(post);
};

exports.remove = async (req, res) => {
  const post = await db.post.findOne({ where: { post_id: req.params.id } });
  if (post !== null) {
    await post.destroy();
    removed = true;
  }

  return res.json(removed);
};
