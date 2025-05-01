const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Trailer = sequelize.define('Trailer', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  youtubeUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  thumbnailUrl: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true
    }
  }
});

module.exports = Trailer;