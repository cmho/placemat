'use server';

export async function socketListener (username) {
	const messages = [];
	const ws = new WebSocket("wss://stream.place/api/websocket/"+username);
	ws.addEventListener('open', (e) => {
	  console.log(e);
	});

	ws.addEventListener('error', (e) => {
	  console.log(e);
	});

	ws.addEventListener('close', (e) => {
	  if (e.wasClean) {
	    console.log('WebSocket connection closed cleanly');
	  } else {
	    console.error('WebSocket connection closed unexpectedly');
	    // Attempt to re-establish the connection
	  }
	});

	ws.addEventListener('message', async (e) => {
		const data = JSON.parse(e.data);
<<<<<<< Updated upstream
		console.log(data);
	  if (data['$type'] === "place.stream.chat.defs#messageView"
		&& Date.parse(data["record"]["createdAt"]) > cursor) {
			if (!(username in messages)) {
				messages[username] = [];
			}
			messages[username].push(data);
			cursor = Date.parse(data["record"]["createdAt"]);
=======
	  if (data['$type'] === "place.stream.chat.defs#messageView") {
			messages.push(data);
>>>>>>> Stashed changes
		}
	});
	
	function getMessages() {
		return messages;
	}
<<<<<<< Updated upstream
	return messages[username].slice(-1*count);
}

export async function getFeedMessages(feedUri) {
	const feedMessages = await fetch("https://public.api.bsky.app/xrpc/app.bsky.feed.getFeed?feed="+feed);
	const feedRes = await feedMessages.json();
	const feedData = feedRes.feed.filter((msg) => {
		return 'record' in msg.post && 'createdAt' in msg.post.record && Date.parse(msg.post.record.createdAt) > cursor;
	}).map((msg) => {
		return {
			author: msg.post.author.handle,
			message: msg.post.record.text,
			time: msg.post.record.createdAt
		};
	});
	return feedData;
	if (feedData.length > 0) {
		feedMessageSetter(feedData);
	}
}

export async function getLatestFollower(username) {
	const followerReq = await fetch('https://public.api.bsky.app/xrpc/app.bsky.graph.getFollowers?actor='+username);
	const followerData = await followerReq.json();
	console.log(followerData);
	if (followerData?.followers?.length > 0) return followerData?.followers[0];
	return "";
=======
>>>>>>> Stashed changes
}