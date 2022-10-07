const { getApplication } = require("./app");
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const host = process.env.host ?? "localhost";
const port = process.env.port ?? 3000;

const application = getApplication();

console.log('dbHost ', process.env.dbHost);

application.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
