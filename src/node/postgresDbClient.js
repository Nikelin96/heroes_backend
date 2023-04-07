const { Client } = require("pg");
const { dbConfig } = require("./config");

const setupPostgresClient = () => {
  const client = new Client({
    user: dbConfig.user,
    host: dbConfig.host,
    database: dbConfig.database,
    password: dbConfig.password,
    port: dbConfig.port,
  });

  client.connect((error) => {
    if (error) {
      console.error("Error connecting to database:", error);
      client.end();
    } else {
      console.log("Connected to database!");
    }
  });

  client.on("error", (error) => {
    console.error("Database error:", error);
    client.end();
  });

  return client;
};

const getDbClient = (mock) => {
  return mock || setupPostgresClient();
};

module.exports = getDbClient;