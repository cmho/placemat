import Fastify from 'fastify';

// ============ SETTINGS ============= //

const port = 8080;

// ================================== //

const fastify = Fastify({
  logger: true
});

fastify.get('/', (req, res) => {
  res.send({ hello: 'world' })
});

const messages = {};
let cursor = 0;

fastify.get('/:username', async (req, res) => {
	const { username } = req.params;
	const ws = new WebSocket('wss://stream.place/api/websocket/'+username);
	if (!(username in messages)) {
		messages[username] = [];
	}

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

	ws.addEventListener('message', async (e) => {
		const data = JSON.parse(e.data);
	  if (data['$type'] === "place.stream.chat.defs#messageView"
		&& Date.parse(data["record"]["createdAt"]) > cursor) {
			messages[username].push(data);
			cursor = Date.parse(data["record"]["createdAt"]);
		}
	});
	
	res.header('Content-Type', 'application/json');
	res.header('Access-Control-Allow-Origin', '*');
	res.send(JSON.stringify(messages[username]));
});

fastify.listen({ port: port }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});