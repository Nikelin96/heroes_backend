const { Client } = require("pg");

const setupPostgresClient = () => {
  const client = new Client({
    user: process.env.dbUser ?? "postgres",
    host: process.env.dbHost ?? "localhost",
    database: process.env.dbName ?? "postgres",
    password: process.env.dbPassword ?? "docker",
    port: process.env.dbPort ?? 5432,
  });

  client.connect((error) => {
    if (error) {
      throw error;
    }
    console.log("Connected!");
  });

  return client;
};

const getDbClient = (isUnderTest, mock) => {
  return isUnderTest ? mock : setupPostgresClient();
};

module.exports = getDbClient;
