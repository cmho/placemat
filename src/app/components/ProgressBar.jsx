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
			<div className={styles[style]} style={{backgroundColor: "var(--background)", width: "var(--width)", height: "var(--height)"}}>
				<div className={styles.barInner} style={{backgroundColor: "var(--foreground)", width: (style === 'horizontal-bar' ? "var(--percent)" : '100%'), height: (style === 'vertical-bar' ? "var(--percent)" : '100%')}}>
				</div>
				<div className={styles.textDisplay} style={{textShadow: "-1px -1px 0 var(--background), 1px 1px 0 var(--background), 1px -1px 0 var(--background), -1px 1px 0 var(--background), 1px 0 0 var(--background), -1px 0 0 var(--background), 0 1px 0 var(--background), 0 -1px 0 var(--background)"}}>{current} / {maximum}</div>
			</div>
		</div>
	)
}