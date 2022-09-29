const supertest = require("supertest");
const { getApplication } = require("./app");

test("GET returns 200Ok", async () => {
  // arrange
  const heroes = [];
  const repositoryMock = {
    getHeroesAsync: jest.fn().mockImplementation(async () => {
      return heroes;
    }),
  };
  const app = getApplication(repositoryMock);

  // act
  await supertest(app)
    .get("/")
    // assert
    .expect(200)
    .then((response) => {
      expect(response.body).toStrictEqual(heroes);
    });
});

test("GET by name returns 200Ok", async () => {
  // arrange
  const heroName = "name";
  const repositoryMock = {
    getHeroesAsync: jest.fn().mockImplementation(async () => {
      return [{ name: heroName }, { name: "name2" }];
    }),
  };
  const app = getApplication(repositoryMock);
  // act
  await supertest(app)
    .get(`?searchText=${heroName}`)
    // assert
    .expect(200)
    .then((response) => {
      expect(response.body).toStrictEqual({ name: heroName });
    });
});

test("GET by id returns 200Ok", async () => {
  // arrange
  const heroId = 123;
  const repositoryMock = {
    getHeroesAsync: jest.fn().mockImplementation(async () => {
      return [{ id: 122 }, { id: heroId }, { id: 124 }];
    }),
  };
  const app = getApplication(repositoryMock);
  // act
  await supertest(app)
    .get(`/${heroId}`)
    // assert
    .expect(200)
    .then((response) => {
      expect(response.body).toStrictEqual({ id: heroId });
    });
});

test("POST returns 201Created", async () => {
  // arrange
  const payload = { name: "name1" };
  const repositoryMock = {
    createHeroAsync: jest.fn().mockImplementation(async (hero) => {
      return hero;
    }),
  };
  const app = getApplication(repositoryMock);
  // act
  await supertest(app)
    .post(`/`)
    .send(payload)
    // assert
    .expect(201)
    .then((response) => {
      expect(response.body).toStrictEqual(payload);
    });
});

test("PUT returns 200Ok", async () => {
  // arrange
  const payload = { name: "name1" };
  const repositoryMock = {
    updateHeroAsync: jest.fn().mockImplementation(async (hero) => {
      return hero;
    }),
  };
  const app = getApplication(repositoryMock);
  // act
  await supertest(app)
    .put(`/`)
    .send(payload)
    // assert
    .expect(200);
});

test("DELETE by id returns 200Ok", async () => {
  // arrange
  const heroId = 123;
  const repositoryMock = {
    deleteHeroAsync: jest.fn().mockImplementation(async (id) => {
      return id;
    }),
  };
  const app = getApplication(repositoryMock);
  // act
  await supertest(app)
    .delete(`/${heroId}`)
    // assert
    .expect(200);
});
