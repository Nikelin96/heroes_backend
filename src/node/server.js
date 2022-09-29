const { getApplication } = require("./app");

const host = process.env.host ?? "localhost";
const port = process.env.port ?? 3000;

const application = getApplication();

application.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
