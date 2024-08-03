module.exports = (sequelize, DataTypes) =>
  sequelize.define("film", {
    film_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    releaseDate: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
    },
    poster: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
