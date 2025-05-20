'use client';

import styles from '../page.module.css';
import { useEffect, useRef, forwardRef } from 'react';

interface Props {
	id: string,
	label: string,
	uuid?: string,
	children: React.ReactNode,
	callback: any
}

export default forwardRef<string[], Props>(function ListItemFormElements(props, ref) {
	const { id, label, uuid, children, callback } = props;
	
	const addItem = () => {
		if (uuid) {
			if (!ref.current[uuid]) ref.current[uuid] = {};
			if (!ref.current[uuid].items) ref.current[uuid].items = [];
			ref.current[uuid].items.push("");
		} else {
			if (!Array.isArray(ref.current)) ref.current = [];
			ref.current.push("");
		}
		callback();
	}
	
	const removeItem = (i) => {
		if (uuid) {
			ref.current[uuid].items.splice(i, 1);
		} else {
			ref.current.splice(i, 1);
		}
		callback();
	}
	
	const updateItem = (i, value) => {
		if (uuid) {
			ref.current[uuid].items[i] = value;
		} else {
			ref.current[i] = value;
		}
		callback();
	}
	
	return (
		<>
			<p className={styles.buttonRow}>
				<b>{label}</b>
				<button type="button" onClick={addItem}>Add</button>
			</p>
			<ul className={styles.listItemsList}>
			{console.log(ref.current)}
				{uuid ? ref.current[uuid].items.map((item, i) => {
					return (
						<li key={i}>
							<input type="text" defaultValue={item} name={'widgets['+uuid+'][items][]'} onChange={(e) => updateItem(i, e.target.value)} /> <button type="button" onClick={() => removeItem(i)}>Remove</button>
						</li>
					)
				}) : ref.current.map((item, i) => {
					return (
						<li key={i}>
							<input type="text" defaultValue={item} name={'widgets['+uuid+'][items][]'} onChange={(e) => updateItem(i, e.target.value)} /> <button type="button" onClick={() => removeItem(i)}>Remove</button>
						</li>
					)
				})}
			</ul>
			{children}
		</>
	)
});