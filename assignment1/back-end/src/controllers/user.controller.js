const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findOne({where: {username: req.params.id}});
  res.json(user);
};

// Select one user from the database by email
exports.email = async (req, res) => {
  const user = await db.user.findOne({where: {email: req.params.id}});
  res.json(user);
};

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findOne({ where: { username: req.query.username } });

  if(user === null || await argon2.verify(user.password_hash, req.query.password) === false)
    // Login failed.
    res.json(null);
  else
    res.json(user);
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  
  const user = await db.user.create({
    username: req.body.username,
    password_hash: hash,
    email: req.body.email,
    date: req.body.date,
    isBlocked: false
  });

  res.json(user);
};

// Update a user in the database.
exports.update = async (req, res) => {
  const user = await db.user.findOne({where: {username: req.params.id}});

  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  user.username = req.body.username;
  user.password_hash = hash;
  user.email = req.body.email;
  user.date = req.body.date;
  await user.save();
  return res.json(user);
};

// delete a user in database
exports.remove = async (req,res) => {
  
  const user = await db.user.findOne({where: {username: req.params.id}});
  if(user !== null) {
    await user.destroy();
    removed = true;
  }

  return res.json(removed);
};