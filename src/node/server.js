const app = require('./app.js');

// setup listening
const hostname = process.env.serverHost ?? 'localhost';
const port = process.env.serverPort ?? 3000;

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});