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

test('createHeroAsync calls client once', async () => {
  // arrange
  const clientMock = {
    query: jest.fn().mockImplementation(async () => {
      return { rows: [] };
    })
  }
  const sut = new PostgresRepository(clientMock);
  const hero = { name: "name1" };

  // act
  await sut.createHeroAsync(hero);

  // assert
  expect(sut.client.query).toHaveBeenCalledWith('INSERT INTO "Hero" ("Name") VALUES ($1) RETURNING *', [hero.name]);
});

test('getHeroesAsync returns heroes', async () => {
  // arrange
  const clientMock = {
    query: jest.fn().mockImplementation(async () => {
      return { rows: [{ Id: 1, Name: "Name1" }, { Id: 2, Name: "Name2" }, { Id: 3, Name: "Name3" }] };
    })
  }
  const expected = [{ id: 1, name: "Name1" }, { id: 2, name: "Name2" }, { id: 3, name: "Name3" }];
  const sut = new PostgresRepository(clientMock);

  // act
  const actual = await sut.getHeroesAsync();

  // assert
  expect(actual).toStrictEqual(expected);
  expect(sut.client.query).toHaveBeenCalledWith('SELECT * FROM "Hero"')
});

test('updateHeroAsync calls client once', async () => {
  // arrange
  const clientMock = {
    query: jest.fn().mockImplementation(async () => {
      return { rows: [] };
    })
  }
  const sut = new PostgresRepository(clientMock);
  const hero = { name: "name1", id: 1 }

  // act
  await sut.updateHeroAsync(hero);

  // assert
  expect(sut.client.query).toHaveBeenCalledWith('UPDATE "Hero" SET "Name" = ($1) WHERE "Id" = ($2)', [hero.name, hero.id]);
});

test('deleteHeroAsync calls client once', async () => {
  // arrange
  const clientMock = {
    query: jest.fn().mockImplementation(async () => {
      return { rows: [] };
    })
  }

  const sut = new PostgresRepository(clientMock);
  const heroId = 1;

  // act
  await sut.deleteHeroAsync(heroId);

  // assert
  expect(sut.client.query).toHaveBeenCalledWith('DELETE FROM "Hero" WHERE "Id" = ($1)', [heroId]);;
});