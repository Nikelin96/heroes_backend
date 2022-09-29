const getRepository = require("./postgresRepository");

test("constructor returns instance", () => {
  // arrange
  const clientMock = new Object();

  // act
  const sut = getRepository(clientMock);

  // assert
  expect(sut).not.toBeNull();
  expect(sut.client).toBe(clientMock);
});

test("createHeroAsync calls client once", async () => {
  // arrange
  const clientMock = {
    query: jest.fn().mockImplementation(async () => {
      return { rows: [] };
    }),
  };
  const sut = getRepository(clientMock);
  const hero = { name: "name1" };

  // act
  await sut.createHeroAsync(hero);

  // assert
  expect(sut.client.query).toHaveBeenCalledWith(
    'INSERT INTO "hero" ("name") VALUES ($1) RETURNING *',
    [hero.name]
  );
});

test("getHeroesAsync returns heroes", async () => {
  // arrange
  const clientMock = {
    query: jest.fn().mockImplementation(async () => {
      return {
        rows: [
          { id: 1, name: "name1" },
          { id: 2, name: "name2" },
          { id: 3, name: "name3" },
        ],
      };
    }),
  };
  const expected = [
    { id: 1, name: "name1" },
    { id: 2, name: "name2" },
    { id: 3, name: "name3" },
  ];
  const sut = getRepository(clientMock);

  // act
  const actual = await sut.getHeroesAsync();

  // assert
  expect(actual).toStrictEqual(expected);
  expect(sut.client.query).toHaveBeenCalledWith('SELECT * FROM "hero"');
});

test("updateHeroAsync calls client once", async () => {
  // arrange
  const clientMock = {
    query: jest.fn().mockImplementation(async () => {
      return { rows: [] };
    }),
  };
  const sut = getRepository(clientMock);
  const hero = { name: "name1", id: 1 };

  // act
  await sut.updateHeroAsync(hero);

  // assert
  expect(sut.client.query).toHaveBeenCalledWith(
    'UPDATE "hero" SET "name" = ($1) WHERE "id" = ($2)',
    [hero.name, hero.id]
  );
});

test("deleteHeroAsync calls client once", async () => {
  // arrange
  const clientMock = {
    query: jest.fn().mockImplementation(async () => {
      return { rows: [] };
    }),
  };

  const sut = getRepository(clientMock);
  const heroId = 1;

  // act
  await sut.deleteHeroAsync(heroId);

  // assert
  expect(sut.client.query).toHaveBeenCalledWith(
    'DELETE FROM "hero" WHERE "id" = ($1)',
    [heroId]
  );
});
