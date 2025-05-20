'use client';

import styles from '../overlay.module.css';
import { useState, useEffect } from 'react';

interface Props {
	id: string,
	heading: string,
	color: string,
	width: number,
	height: number,
	posx: number,
	posy: number,
	items: string[]
}

export default function List (props: Props) {
	const { id, heading, color, width, height, posx, posy, items } = props;
	const [listItems, setListItems] = useState(items);
	
	useEffect(() => {
		setListItems(items);
	}, []);
	
	return (
		<div id={id} className={styles.widget} style={{color: color, width: width+'px', height: height+'px', left: posx+'px', top: posy+'px'}}>
			<h2>{heading}</h2>
			<ul>
			{console.log(listItems)}
				{listItems ? listItems.map((item, i) => {
					return (
						<li key={i}>{item}</li>
					);
				}) : ''}
			</ul>
		</div>
	);
}