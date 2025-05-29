'use client';

import { useState, useRef, useEffect } from 'react';
import styles from '../overlay.module.css';

export default function Widgets (props) {
	const { widgetData } = props;
	
	return (
		<>
			{widgetData ? Object.keys(widgetData).map((uuid, i) => {
				const data = widgetData[uuid];
				if (type === 'progress') {
					return (
						<ProgressBar key={i} id={data.id} foreground={data.foreground} background={data.background} width={data.width} height={data.height} posx={data.posx} posy={data.posy} current={data.current} maximum={data.maximum} style={data.style} />
					)
				} else if (type === 'list') {
					return (
						<List key={i} id={data.id} heading={data.heading} color={data.foreground} width={data.width} height={data.height} posx={data.posx} posy={data.posy} items={data.items} />
					)
				} else if (type === 'timer') {
					return (
						<Timer key={i} id={data.id} foreground={data.foreground} background={data.background} posx={data.posx} posy={data.posy} width={data.width} height={data.height} heading={data.heading} timer={data.timer} defaultTime={data.defaultTime} />
					)
				}
			}) : ''}
		</>
	)
}