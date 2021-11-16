const { getApp } = require('./app');

// setup listening
const hostname = process.env.serverHost ?? 'localhost';
const port = process.env.serverPort ?? 3000;

const app = getApp();

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});