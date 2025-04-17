const http = require('node:http');

// ============ SETTINGS ============= //

const username = 'iame.li';
const port = 8080;

// ================================== //

const ws = new WebSocket('wss://stream.place/api/websocket/'+username);
let messages = [];

ws.addEventListener('open', (e) => {
  console.log(e);
});

ws.addEventListener('error', (e) => {
  console.log(e);
});

ws.addEventListener('close', (e) => {
  console.log(e);
  if (e.wasClean) {
    console.log('WebSocket connection closed cleanly');
  } else {
    console.error('WebSocket connection closed unexpectedly');
    // Attempt to re-establish the connection
  }
});

ws.addEventListener('message', (e) => {
	const data = JSON.parse(e.data);
  if (data['$type'] === "place.stream.chat.defs#messageView") {
		messages.push(data);
	}
});

const server = http.createServer((req, res) => {
	res.writeHead(200, {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*'
	});
	res.end(JSON.stringify(messages));
});

server.listen(port);