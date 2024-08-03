const db = require("../database");

// Select all ticket from the database based on username
exports.find = async (req, res) => {
  const user = await db.user.findOne({ where: { username: req.params.id } });
  if (user) {
    const ticket = await db.ticket.findAll({
      where: { user_id: user.user_id },
      include: [
        { model: db.user, attributes: ["user_id", "username"] },
        {
          model: db.session,
          include: {
            model: db.film,
            attributes: ["film_id", "title"],
          },
        },
      ],
    });

    res.json(ticket);
  }
};

// Select all tickets
exports.all = async (req, res) => {
  const tickets = await db.ticket.findAll();
  res.json(tickets);
};

// Create a ticket in the database.
exports.create = async (req, res) => {
  const film = await db.film.findOne({ where: { title: req.body.title } });
  const user = await db.user.findOne({
    where: { username: req.body.username },
  });

  const session = await db.session.findOne({
    where: { session: req.body.session, film_id: film.film_id },
  });

  const ticket = await db.ticket.create({
    quantity: req.body.quantity,
    user_id: user.user_id,
    session_id: session.session_id,
  });
  user.addTicket(ticket);
  session.addTicket(ticket);
  res.json(ticket);
};

// delete all ticket of an account
exports.remove = async (req, res) => {
  const ticket = await db.ticket.findOne({
    where: { ticket_id: req.params.id },
  });
  if (ticket !== null) {
    await ticket.destroy();
    removed = true;
  }

  return res.json(removed);
};
