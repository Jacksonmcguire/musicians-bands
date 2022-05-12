const {sequelize} = require('./db');
const {Band, Musician} = require('./index')

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
            name: 'band1',
            instrument: 'genre1'
        })
        expect(newMusician.name).toBe('band1');
    })

    test('has correct associations', async () => {
        const newMusician = await Musician.create({
            name: 'band1',
            instrument: 'guitar'
        })
        const newBand = await Band.create({
            name: 'band1',
            genre: 'genre1'
        })

        await newBand.addMusician(2)
        await newBand.addMusician(1)
        const bandsMusicians = await newBand.getMusicians()
        expect(bandsMusicians.length).toBe(2)
    })
})