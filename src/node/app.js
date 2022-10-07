function setupApplication(repository) {
  const express = require("express");
  const expressServer = express();

  expressServer.use(express.urlencoded({ extended: true }));
  expressServer.use(express.json());

  expressServer.get("/:id", async (request, response) => {
    console.log("GET unit by id: ", request.params.id);

    let units = await repository.getUnitsAsync();

    // const id = parseInt(request.params.id);
    // heroes = heroes.find((heroes) => heroes.id == id);

    completeResponse(response, 200, units);
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
