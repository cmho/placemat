import type { NextApiRequest, NextApiResponse } from 'next';
import useWebSocket from 'react-use-websocket';
import { WebSocket } from 'ws';

export default function handler(req, res) {
	const { getWebSocket } = useWebSocket(
    'wss://stream.place/api/websocket/'+req.query.username,
    {
      share: false,
      shouldReconnect: () => true,
			onOpen: (event) => {
				console.log('Connected successfully.');
			},
			onClose: (event) => {
				console.log('Connection closed.');
			},
			onMessage: (event) => {
				console.log(event);
			},
			onError: (event) => {
				console.log('Error:');
				console.log(event);
			}
    },
  );
  if (req.method === 'GET') {
    // Process a POST request
  } else {
    // Handle any other HTTP method
  }
}