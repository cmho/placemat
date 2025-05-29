import { WebSocket, WebSocketServer } from 'ws';
import { IncomingMessage } from 'http';

export function GET() {
  const headers = new Headers();
  headers.set('Connection', 'Upgrade');
  headers.set('Upgrade', 'websocket');
  return new Response('Upgrade Required', { status: 426, headers });
}

export function SOCKET(client, _request, _server, { params }) {
	console.log("A client connected");

  client.on("close", () => {
    console.log("A client disconnected");
  });
	
	const { username } = params;
	const spSock = new WebSocket('wss://stream.place/api/websocket/'+username);
	spSock.addEventListener('message', (e) => {
		const data = JSON.parse(e.data);
		if (data['$type'] === 'place.stream.chat.defs#messageView') {
			const messageText = data.record?.text;
			const author = data.author?.handle;
			const color = data.chatProfile?.color;
			const msgTime = Date.parse(data.record?.createdAt);
			const newRecord = {
				message: messageText,
				author: author,
				color: color,
				messageTime: msgTime,
			};
			client.send(JSON.stringify(newRecord));
		}
	});
}