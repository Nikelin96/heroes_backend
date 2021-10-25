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

test('getHeroesAsync returns heroes', async () => {
    // arrange
    const clientMock = {
        query: jest.fn().mockImplementation(async () => {
            return { rows: [{ Id: 1, Name: "Name1" }, { Id: 2, Name: "Name2" }, { Id: 3, Name: "Name3" }] };
        })
    }
    const expected = [{ id: 1, name: "Name1" }, { id: 2, name: "Name2" }, { id: 3, name: "Name3" }]

    const sut = new PostgresRepository(clientMock);

    // act
    const actual = await sut.getHeroesAsync();

    // assert
    expect(actual).toStrictEqual(expected);
    expect(sut.client.query).toHaveBeenCalledTimes(1);
});

test('deleteHeroAsync calls client once', async () => {
    // arrange
    const clientMock = {
        query: jest.fn().mockImplementation(async () => {
            return { rows: [] };
        })
    }

    const sut = new PostgresRepository(clientMock);

    // act
    await sut.deleteHeroAsync(1);

    // assert
    expect(sut.client.query).toHaveBeenCalledTimes(1);
});

test('createHeroAsync calls client once', async () => {
    // arrange
    const clientMock = {
        query: jest.fn().mockImplementation(async () => {
            return { rows: [] };
        })
    }

    const sut = new PostgresRepository(clientMock);

    // act
    await sut.createHeroAsync(1);

    // assert
    expect(sut.client.query).toHaveBeenCalledTimes(1);
});

test('updateHeroAsync calls client once', async () => {
    // arrange
    const clientMock = {
        query: jest.fn().mockImplementation(async () => {
            return { rows: [] };
        })
    }

    const sut = new PostgresRepository(clientMock);

    // act
    await sut.updateHeroAsync(1);

    // assert
    expect(sut.client.query).toHaveBeenCalledTimes(1);
});