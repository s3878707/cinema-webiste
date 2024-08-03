module.exports = (sequelize, DataTypes) =>
  sequelize.define("user", {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    password_hash: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    date: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
