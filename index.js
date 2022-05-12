const {Band} = require('./Band')
const {Musician} = require('./Musician')
const {Song, SongBands} = require('./Song')

Band.hasMany(Musician)
Musician.belongsTo(Band)

Band.belongsToMany(Song, {through: "SongBands"})
Song.belongsToMany(Band, {through: "SongBands"})
module.exports = {
    Band,
    Musician,
    Song
};
