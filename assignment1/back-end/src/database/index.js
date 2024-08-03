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

// Relate tables.
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

// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  await seedData();
};

async function seedData() {
  const count = await db.user.count();
  const count_film = await db.film.count();
  const count_session = await db.session.count();
  // Only seed data if necessary.
  if (count > 0) return;

  const argon2 = require("argon2");

  let hash = await argon2.hash("abc123", { type: argon2.argon2id });
  await db.user.create({
    username: "mbolger",
    password_hash: hash,
    email: "mbolger@gmail.com",
    date: "11/20/2020",
    isBlocked: false,
  });

  hash = await argon2.hash("def456", { type: argon2.argon2id });
  await db.user.create({
    username: "shekhar",
    password_hash: hash,
    email: "shekhar@gmail.com",
    date: "11/20/2020",
    isBlocked: false,
  });

  if (count_film > 0) return;

  const film_1 = await db.film.create({
    title: "Avatar 2",
    rating: 0,
    releaseDate: "2023 - 01 - 01",
    description:
      "Set more than a decade after the events of the first film, Avatar: The Way of Water begins to tell the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
    poster:
      "https://www.xfire.com/wp-content/uploads/2022/03/Avatar-2-Trailer-News.jpg",
  });

  const film_2 = await db.film.create({
    title: "The Monkey King 3",
    rating: 0,
    releaseDate: "2023 - 01 - 01",
    description:
      "The third installment of the blockbuster fantasy series sees the return of the Monkey King (Aaron Kwok) in his most action-packed adventure yet, as the travelers on their journey to the West are imprisoned by the Queen of an all-female kingdom and threatened by the wrathful River God.",
    poster:
      "https://occ-0-64-1380.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABZP3GeXRxBgql10Lgi_G-oUlbMs-Nu3cY6WfGCI0JybcBICCkkV6ttlXW-duW06jJ576RlRO8kdi0r06fyjUhe4ssh5raelAMbeH.jpg?r=f43",
  });
  const film_3 = await db.film.create({
    title: "The Boss Baby",
    rating: 0,
    releaseDate: "2023 - 01 - 01",
    description:
      "In the sequel to DreamWorks Animation’s Oscar®-nominated blockbuster comedy, the Templeton brothers—Tim (James Marsden, X-Men franchise) and his Boss Baby little bro Ted (Alec Baldwin)—have become adults and drifted away from each other. Tim is now a married stay-at-home dad. Ted is a hedge fund CEO. But a new boss baby with a cutting-edge approach and a can-do attitude is about to bring them together again … and inspire a new family business. Tim and his wife, Carol (Eva Longoria), the breadwinner of the family, live in the suburbs with their super-smart 7-year-old daughter Tabitha (Ariana Greenblatt, Avengers: Infinity War), and adorable new infant Tina (Amy Sedaris, Netflix’s BoJack Horseman). Tabitha, who’s at the top her class at the prestigious Acorn Center for Advanced Childhood, idolizes her Uncle Ted and wants to become like him, but Tim, still in touch with his overactive youthful imagination, worries that she’s working too hard and is missing out on a normal childhood. When baby Tina reveals that she’s—ta-da!—a top secret agent for BabyCorp on a mission to uncover the dark secrets behind Tabitha’s school and its mysterious founder, Dr. Edwin Armstrong (Jeff Goldblum), it will reunite the Templeton brothers in unexpected ways, lead them to re-evaluate the meaning of family and discover what truly matters. Lisa Kudrow and Jimmy Kimmel also reprise their roles as Ted and Tim’s parents. Building on the success of the first film, which earned more than $500 million worldwide, The Boss Baby: Family Business is directed by returning filmmaker Tom McGrath and is produced by Jeff Hermann (Kung Fu Panda 3).",
    poster:
      "https://images1.resources.foxtel.com.au/store2/mount1/16/4/6gzcu.jpg",
  });
  const film_4 = await db.film.create({
    title: "Kung Fu Panda 2",
    rating: 0,
    releaseDate: "2023 - 01 - 01",
    description:
      "Po and his friends fight to stop a peacock villain from conquering China with a deadly new weapon, but first the Dragon Warrior must come to terms with his past.",
    poster:
      "https://lh3.googleusercontent.com/Pe0VratJbEpfPC0NAkblOPlbp4KIb39YbjtSNQcAJntX2N7UBN61i1ry9s1OIhB-iCc-TlwcRWc",
  });
  const film_5 = await db.film.create({
    title: "Scooby-Doo 2",
    rating: 0,
    releaseDate: "2023 - 01 - 01",
    description:
      "The Mystery Inc. gang must save Coolsville from an attack of their past monsters brought to life by an evil masked figure trying to take down the gang.",
    poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc844P4Bpvv_IdvSePn-vNfWOeAhoKLz4Ixw&usqp=CAU",
  });
  const film_6 = await db.film.create({
    title: "Tom and Jerry",
    rating: 0,
    releaseDate: "2023 - 01 - 01",
    description:
      "Jerry, a small mouse, lives within the walls of a large, New England country home where he's befriended the longtime owners, a loving elderly couple. Their unique, comedic friendship comes to an end after the elderly couple passes on and their house is put up for sale. When a young family moves in, Jerry's determined to scare them away from taking over his home. The family quickly adopts a stray cat, later named Tom, to help rid them of their pest problem. In an epic battle for the house, Tom & Jerry soon discover their growing adoration for the family and must work together to protect them from an outside threat. Through their teamwork, they both learn the ultimate value of family and friendship.",
    poster:
      "https://variety.com/wp-content/uploads/2023/07/Tom-and-Jerry-Singapore-series-poster.jpg",
  });
  const film_7 = await db.film.create({
    title: "Mr. Bean's Holiday",
    rating: 0,
    releaseDate: "2023 - 01 - 01",
    description:
      "The hapless Mr. Bean takes a vacation on the French Riviera, where he becomes ensnared in an accidental kidnapping and a case of mistaken identity.",
    poster:
      "https://occ-0-2773-3934.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABYB8AEl7cQpXqQ_EHHo_Rk5oOxMPWtpOJuAQ8Fl_PuW-_IdLWUw0545mMR1hX9Gf-jQx71Q3YWRnNsgKsNzX2BN1lRidRfnhuJrY.jpg?r=954",
  });

  if (count_session > 0) return;
  await db.session.create({
    session: "2023-10-18 14:30:00",
    slot: 10,
    film_id: film_1.film_id,
  });

  await db.session.create({
    session: "2023-10- 14:30:00",
    slot: 10,
    film_id: film_1.film_id,
  });

  await db.session.create({
    session: "2023-10-18 12:30:00",
    slot: 10,
    film_id: film_2.film_id,
  });

  await db.session.create({
    session: "2023-10- 12:30:00",
    slot: 10,
    film_id: film_2.film_id,
  });

  await db.session.create({
    session: "2023-10-18 15:30:00",
    slot: 10,
    film_id: film_3.film_id,
  });

  await db.session.create({
    session: "2023-10- 15:30:00",
    slot: 10,
    film_id: film_3.film_id,
  });

  await db.session.create({
    session: "2023-10-18 12:30:00",
    slot: 10,
    film_id: film_4.film_id,
  });

  await db.session.create({
    session: "2023-10- 12:30:00",
    slot: 10,
    film_id: film_4.film_id,
  });

  await db.session.create({
    session: "2023-10-18 12:30:00",
    slot: 10,
    film_id: film_5.film_id,
  });

  await db.session.create({
    session: "2023-10- 12:30:00",
    slot: 10,
    film_id: film_5.film_id,
  });

  await db.session.create({
    session: "2023-10-18 12:30:00",
    slot: 10,
    film_id: film_6.film_id,
  });

  await db.session.create({
    session: "2023-10- 12:30:00",
    slot: 10,
    film_id: film_6.film_id,
  });

  await db.session.create({
    session: "2023-10-18 12:30:00",
    slot: 10,
    film_id: film_7.film_id,
  });

  await db.session.create({
    session: "2023-10- 12:30:00",
    slot: 10,
    film_id: film_7.film_id,
  });
}

module.exports = db;
