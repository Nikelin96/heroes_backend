const PostgresRepository = require('./postgresRepository');

test('constructor returns instance', () => {
    // arrange
    let clientMock = new Object();

    // act
    let sut = new PostgresRepository(clientMock);

    // assert
    expect(sut).not.toBeNull();
    expect(sut.client).toBe(clientMock);
});

test('getHeroesAsync calls client once', () => {
    // arrange
    const clientMock = {
        query: jest.fn().mockImplementation(() => {
            return { rows: [] };
        })
    }

    let sut = new PostgresRepository(clientMock);

    // act
    sut.getHeroesAsync();

    // assert
    expect(sut.client.query).toHaveBeenCalledTimes(1);
});