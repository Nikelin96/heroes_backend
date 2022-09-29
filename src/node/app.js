function setupApplication(repository) {
  const express = require("express");
  const expressServer = express();

  expressServer.use(express.urlencoded({ extended: true }));
  expressServer.use(express.json());

  expressServer.get("/", async (request, response) => {
    console.log(`GET heroes`);

    let heroes = await repository.getHeroesAsync();

    let searchText = request.query.searchText;
    if (searchText) {
      searchText = searchText.toLowerCase();
      heroes = heroes.find((heroes) =>
        heroes.name.toLowerCase().startsWith(searchText)
      );
    }

    completeResponse(response, 200, heroes);
  });

  expressServer.get("/:id", async (request, response) => {
    console.log("GET hero by id: ", request.params.id);

    let heroes = await repository.getHeroesAsync();

    const id = parseInt(request.params.id);
    heroes = heroes.find((heroes) => heroes.id == id);

    completeResponse(response, 200, heroes);
  });

  expressServer.post("/", async (request, response) => {
    const hero = request.body;
    await repository.createHeroAsync(hero);

    completeResponse(response, 201, hero);
  });

  expressServer.put("/", async (request, response) => {
    const hero = request.body;

    await repository.updateHeroAsync(hero);

    completeResponse(response, 200);
  });

  expressServer.delete("/:id", async (request, response) => {
    console.log("Delete hero by id: ", request.params.id);

    const id = parseInt(request.params.id);
    await repository.deleteHeroAsync(id);

    completeResponse(response, 200);
  });

  const completeResponse = (response, statusCode, body) => {
    response.status(statusCode);
    // response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    if (body) {
      response.json(body);
    } else {
      response.end();
    }
  };

  return expressServer;
}

const getApplication = (mockRepository) => {
  let repository;
  if (mockRepository) {
    repository = mockRepository;
  } else {
    const getDbClient = require("./postgresDbClient");
    const getRepository = require("./postgresRepository");

    let client = getDbClient();
    repository = getRepository(client);
  }

  return setupApplication(repository);
};

module.exports = {
  getApplication: getApplication,
};
