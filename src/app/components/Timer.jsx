'use client';

import styles from '../overlay.module.css';
import { useState, useEffect, useRef } from 'react';

export default function Timer (props) {
	const { id, heading, foreground, background, defaultTime, posx, posy, width, height } = props;
	const [time, setTime] = useState(0);
	console.log(props);
	
	const getTime = (timeStr) => {
		const timeTokens = timeStr.split(":");
		let seconds = 0;
		for (let i = timeTokens.length - 1; i >= 0; i--) {
			const multiplier = 60*(timeTokens.length - 1 - i);
			seconds += parseInt(timeTokens[i])*multiplier;
		}
		return seconds;
	}
	
	const startTimer = () => {
		
	}
	
	const pauseTimer = () => {
	
	}
	
	const endTimer = () => {
	
	}
	
	const changeTimer = () => {
	
	}
	
	const formatTime = () => {
		let seconds = time;
		let minutes = Math.floor(seconds / 60);
		let hours = Math.floor(minutes / 60);
		seconds -= minutes * 60;
		minutes -= hours*60;
		let timeStr = "";
		if (hours > 0) {
			timeStr += (hours.toString().padStart(2, "0") ?? "00")+":";
		}
		timeStr += (minutes.toString().padStart(2, "0") ?? "00")+":"+(seconds.toString().padStart(2, "0"));
		return timeStr;
	}
	
	useEffect(() => {
		setTime(getTime(defaultTime));
	}, [])
	
	return (
		<div id={id} className={styles.widget} style={{left: posx+'px', top: posy+'px'}}>
			<h2>{heading}</h2>
			<div className={styles.timer} style={{width: width+'px', height: height+'px', backgroundColor: background, color: foreground}}>
				{formatTime()}
			</div>
		</div>
	)
}