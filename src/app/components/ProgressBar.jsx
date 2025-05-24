'use client';

import styles from '../overlay.module.css';
import { useState, useEffect } from 'react';

export default function ProgressBar (props) {
	const { id, heading, foreground, background, current, maximum, prependUnits, appendUnits, posx, posy, width, height, uuid, style } = props;
	const [currentVal, setCurrentVal] = useState(current);
	
	return (
		<div id={id} className={styles.widget} style={{color: foreground, left: posx+'px', top: posy+'px'}}>
			<style type="text/css">
				{`:root {\n
					--foreground: ${foreground};\n
					--background: ${background};\n
					--width: ${width}px;\n
					--height: ${height}px;\n
					--percent: ${(currentVal / maximum)}%;\n
				}`}
			</style>
			<h2>{heading}</h2>
				
			{(style === 'circle') ? 
				<>
					<svg width={width} height={height} viewBox={`${width/-8} ${width/-8} ${width*1.25} ${width*1.25}`} version="1.1" xmlns="http://www.w3.org/2000/svg" style="transform:rotate(-90deg)">
				    <circle r={(width / 2) - 10} cx={width / 2} cy={height / 2} fill="transparent" stroke={background} stroke-width="16px"></circle>
				    <circle r={(width / 2) - 10} cx={width / 2} cy={height / 2} stroke={foreground} stroke-width="16px" stroke-linecap="round" stroke-dashoffset={(2*Math.PI*((width / 2)-10)**2) * (current/maximum)} fill="transparent" stroke-dasharray={2*Math.PI*((width / 2)-10)**2}></circle>
					</svg>
					<div className={styles.textDisplay}>{current} / {maximum}</div>
				</>
			: <div className={styles[style]} style={{backgroundColor: "var(--background)", width: "var(--width)", height: "var(--height)"}}>
				<div className={styles.barInner} style={{backgroundColor: "var(--foreground)", width: (style === 'horizontal-bar' ? "var(--percent)" : '100%'), height: (style === 'vertical-bar' ? "var(--percent)" : '100%')}}>
				</div>
				<div className={styles.textDisplay} style={{textShadow: "-1px -1px 0 var(--background), 1px 1px 0 var(--background), 1px -1px 0 var(--background), -1px 1px 0 var(--background), 1px 0 0 var(--background), -1px 0 0 var(--background), 0 1px 0 var(--background), 0 -1px 0 var(--background)"}}>{current} / {maximum}</div>
			</div>}
		</div>
	)
}