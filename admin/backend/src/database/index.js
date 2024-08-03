const { Sequelize, DataTypes, HasMany } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op,
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.post = require("./models/post.js")(db.sequelize, DataTypes);
db.film = require("./models/film.js")(db.sequelize, DataTypes);
db.ticket = require("./models/ticket.js")(db.sequelize, DataTypes);
db.session = require("./models/session.js")(db.sequelize, DataTypes);

db.post.belongsTo(db.user, {
  foreignKey: { name: "user_id", allowNull: false },
});
db.post.belongsTo(db.film, {
  foreignKey: { name: "film_id", allowNull: false },
});
db.ticket.belongsTo(db.user, {
  foreignKey: { name: "user_id", allowNull: false },
});
db.ticket.belongsTo(db.session, {
  foreignKey: { name: "session_id", allowNull: false },
});
db.session.belongsTo(db.film, {
  foreignKey: { name: "film_id", allowNull: false },
});

db.film.hasMany(db.post, { as: "posts" });
db.film.hasMany(db.session, { as: "sessions" });
db.user.hasMany(db.post, { as: "posts", onDelete: "CASCADE" });
db.user.hasMany(db.ticket, { as: "tickets", onDelete: "CASCADE" });
db.session.hasMany(db.ticket, { as: "tickets" });
// Learn more about associations here: https://sequelize.org/master/manual/assocs.html

// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

};

module.exports = db;
