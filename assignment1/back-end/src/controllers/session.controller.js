const { where } = require("sequelize");
const db = require("../database");

// Select all sessions
exports.all = async (req, res) => {
  const session = await db.session.findAll({
    include: [
      { model: db.film, attributes: ["film_id", "title"] },
      { model: db.ticket, as: "tickets" },
    ],
  });
  res.json(session);
};

// Select all sessions based on film
exports.find = async (req, res) => {
  const film = await db.film.findOne({ where: { title: req.params.id } });
  const session = await db.session.findAll({
    where: { film_id: film.film_id },
    include: { model: db.film, attributes: ["film_id", "title"] },
  });
  res.json(session);
};

//Update slot after reserving
exports.updateSlot = async (req, res) => {
  const film = await db.film.findOne({ where: { title: req.params.id } });
  const session = await db.session.findOne({
    where: { film_id: film.film_id, session: req.params.session },
    include: [
      { model: db.film, attributes: ["film_id", "title"] },
      { model: db.ticket, as: "tickets" },
    ],
  });

  if (session.tickets.length != 0) {
    let totalQuantity = 0;
    for (const ticket of session.tickets) {
      totalQuantity += ticket.quantity;
    }
    session.slot = 10 - totalQuantity;
  } else {
    session.slot = 10;
  }
  await session.save();
  return res.json(session);
};

// select session based on title and session
exports.findSession = async (req, res) => {
  const film = await db.film.findOne({ where: { title: req.params.id } });
  const session = await db.session.findOne({
    where: { film_id: film.film_id, session: req.params.session },
    include: [{ model: db.ticket, as: "tickets" }],
  });
  res.json(session);
};
