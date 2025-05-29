'use client';

import { useState, useRef, useEffect } from 'react';
import { getFeedMessages } from './GetFeedMessages';
import styles from '../overlay.module.css';

export default function Feed(props) {
	const { uri, limit } = props;
	const [feedMessages, setFeedMessages] = useState([]);
	
	useEffect(() => {
		setInterval(async () => {
			const feedMsgs = await getFeedMessages(uri);
			setFeedMessages(feedMsgs);
		}, 1000);
	}, []);
	
	return (
		<div id="feed" className="feed">
			<ul>
				{messages.slice(-1*parseInt(limit)).map((msg) => {
					return(
						<li>
							<span className="author">{msg.author}</span>
							<span className="feedMsg">{msg.message}</span>
						</li>
					)
				})}
			</ul>
		</div>
	)
}