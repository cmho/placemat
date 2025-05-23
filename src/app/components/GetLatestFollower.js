'use server';

export async function getLatestFollower(username) {
	const followerReq = await fetch('https://public.api.bsky.app/xrpc/app.bsky.graph.getFollowers?actor='+username);
	const followerData = await followerReq.json();
	if (followerData?.followers?.length > 0) return followerData?.followers[0];
	return "";
}