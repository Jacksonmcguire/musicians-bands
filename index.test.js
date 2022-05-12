const {sequelize} = require('./db');
const {Band, Musician, Song} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
        const newBand = await Band.create({
            name: 'band1',
            genre: 'genre1'
        })
        expect(newBand.genre).toBe('genre1');
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        const newMusician = await Musician.create({
            name: 'musician1',
            instrument: 'genre1'
        })
        expect(newMusician.name).toBe('musician1');
    })

    test('has correct associations', async () => {
        const newMusician = await Musician.create({
            name: 'musician2',
            instrument: 'guitar'
        })
        const newBand = await Band.create({
            name: 'band2',
            genre: 'genre1'
        })

        await newBand.addMusician(2)
        await newBand.addMusician(1)
        const bandsMusicians = await Band.findAll({
            include: [
                {model: Musician, as: 'Musicians'}
            ]
            
        })
        expect(bandsMusicians.length).toBe(2)
    })

    test('Song has correct props', async () => {
        const newSong = await Song.create({
            title: 'Karma police',
            year: 1997
        })

        expect(newSong.title).toBe('Karma police')
    })

    test('song to band - many to many relationships', async () => {
        const newSong = await Song.create({
            title: 'Scenario',
            year: 1996
        })

        const band1 = await Band.findByPk(1)
        const band2 = await Band.findByPk(2)

        await band1.addSong(1)
        await band1.addSong(2)
        await band2.addSong(2)

        const band1Songs = await Band.findByPk(1, {
            include: [
                {model: Song, as: "Songs"}
            ]
        })
        const band2Songs = await band2.getSongs()
        const song2Bands = await Song.findByPk(2, {
            include: [
                {model: Band, as: 'Bands'}
            ]
        })
        expect(song2Bands.Bands).toHaveLength(2)
        expect(band1Songs.Songs).toHaveLength(2)
    })
})