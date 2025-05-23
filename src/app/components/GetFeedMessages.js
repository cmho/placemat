'use server';

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