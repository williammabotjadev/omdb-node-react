const http = require('http');
const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    res.writeHead(200, "text/html");
    res.end();
});

server.listen(() => {
    console.log(`Listening on ${PORT}`)
})