const http = require('http');
const PORT = 8888 || process.env.PORT;

/*
const server = http.createServer( function (req, res) {
   // res.writeHead("content-type", "text/html");
    res.write("Hello, World!");
    res.end();
});

server.listen(() => {
    console.log(`Listening on ${PORT}`)
})*/

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});

server.on('consume', (req, socket, head) => {
    socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
                 'Consume: WebSocket\r\n' +
                 'Connection: Consume\r\n' +
                 '\r\n');
  
    socket.pipe(socket); // echo back
  });

// Now that server is running
server.listen(PORT, 'localhost', () => {

    // make a request
    const options = {
      port: PORT,
      host: 'localhost',
      headers: {
        'Connection': 'Consume',
        'Consume': 'websocket'
      }
    };
  
    const req = http.request(options);
    req.end();
  
    req.on('consume', (res, socket, consumeHead) => {
      http.get("http://www.omdbapi.com/?i=tt3896198&apikey=d122eacd", (resp) => {
        let data = '';
      
        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          console.log(JSON.parse(data));
        });
      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
    });
  });