'use server';

import { useState } from 'react';

export default function ChatMessages(username, count, template) {
	const messages = [];
	console.log('handling');
	const spSock = new WebSocket('wss://stream.place/api/websocket/'+username);
	spSock.addEventListener('message', (e) => {
		const data = JSON.parse(e.data);
		if (data['$type'] === "place.stream.chat.defs#messageView") {
			
		}
	});
	
	return(
		<ul id="messages" className="messages">
		{messages ? messages.slice(-1*count).map((msg, i) => {
			const evenodd = (messages.length - (count - i)) % 2 === 1 ? 'odd' : 'even';
			const template = (template ? template : `<span class="author">{author}</span><span class="message">{message}</span>`;
			const html = 
			return (
				<li className={evenodd}>
					
				</li>
			)
		}) : ''}
		</ul>
	)
}