'use client';

import { useState, useRef, useEffect } from 'react';
import { getLatestFollower } from './GetLatestFollower';
import styles from '../overlay.module.css';

export default function FollowerAlerts (props) {
	const { username, images, alertText, color, posx, posy, width, height } = props;
	const [latestFollower, setLatestFollower] = useState("");
	const [showAlert, setShowAlert] = useState(false);
	const alertImageRef = useRef(null);
	const followerAlertsRef = useRef(null);
	const alertTextRef = useRef(null);
	
	const getRandomAlertImage = () => {
		if (Array.isArray(images) && images.length > 0) {
			const alertImages = images;
			return alertImages[Math.floor(Math.random() * alertImages.length)];
		}
		return null;
	}
	
	useEffect(() => {
		setInterval(async () => {
			const follower = await getLatestFollower(username);
			setLatestFollower(follower.handle);
		}, 5000);
	}, []);
	
	useEffect(() => {
		const alertImage = getRandomAlertImage();
		if (alertImage) {
			alertImageRef.current.style.display = "block";
			alertImageRef.current.src = alertImage;
		} else {
			alertImageRef.current.style.display = "none";
		}
		alertTextRef.current.textContent = alertText.replace("{name}", latestFollower);
		setShowAlert(true)
		
		setTimeout(() => {
			setShowAlert(false);
		}, 5000);
	}, [latestFollower]);
	
	return (
		<div id="followerAlerts" className={styles.followerAlerts} style={{left: posx+'px', top: posy+"px", color: color, display: showAlert ? 'block' : 'none'}} ref={followerAlertsRef}>
			<img className={styles.followerAlertImage} style={{maxWidth: width+"px", maxHeight: height+"px"}} ref={alertImageRef} />
			<div className={styles.followerAlertText} ref={alertTextRef}></div>
		</div>
	);
}