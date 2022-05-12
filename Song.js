const {Sequelize, sequelize} = require('./db');
const {Band} = require('./Band');

const Song = sequelize.define('Song', {
  title: Sequelize.STRING,
  year: Sequelize.INTEGER
})

const SongBands = sequelize.define('SongBands', {
  SongId: {
    type: Sequelize.INTEGER,
    references: {
      model: Song,
      key: 'id'
    }
  },
  BandId: {
    type: Sequelize.INTEGER,
    references: {
      model: Band,
      key: 'id'
    }
  }
})

module.exports = {Song, SongBands}