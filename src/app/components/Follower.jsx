'use client';

import { useState, useEffect } from 'react';
import { getLatestFollower } from './GetLatestFollower';
import styles from '../overlay.module.css';

export default function Follower(props) {
	const { username, posx, posy, width, height, fontSize, color, displayType } = props;
	const [latestFollower, setLatestFollower] = useState("");
	
	const updateFollower = () => {
		const follower = getLatestFollower(username).then((value) => {
			const followerToSet = (displayType === 'handle') ? value.handle : value.displayName;
			if (latestFollower !== followerToSet) setLatestFollower(followerToSet);
		});
	}
	
	useEffect(() => {
		updateFollower();
		setInterval(() => {
			updateFollower();
		}, 5000);
	}, []);
	
	return (
		<div id="latestFollower" className={styles.latestFollower} style={{left: (posx ?? 0)+"px", top: (posy ?? 0)+"px", width: (width ?? 0)+"px", height: (height ?? 0)+"px", fontSize: fontSize ?? "24px", color: color ?? '#000000'}}>
			{latestFollower}
		</div>
	)
}