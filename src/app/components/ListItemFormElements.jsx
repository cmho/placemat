'use client';

import styles from '../page.module.css';
import { useEffect, useRef, forwardRef } from 'react';

export default forwardRef(function ListItemFormElements(props, ref) {
	const { id, label, uuid, children, callback } = props;
	
	const addItem = () => {
		if (ref && 'current' in ref && ref.current) {
			if (uuid && 'uuid' in ref.current) {
				if (!ref.current[uuid]) ref.current[uuid] = {};
				if (!ref.current[uuid].items) ref.current[uuid].items = [];
				ref.current[uuid].items.push("");
			} else {
				if (!Array.isArray(ref.current)) ref.current = [];
				ref.current.push("");
			}
			callback();
		}
	}
	
	const removeItem = (i) => {
		if (ref && 'current' in ref && ref.current) {
			if (uuid && 'uuid' in ref.current) {
				ref.current[uuid].items.splice(i, 1);
			} else {
				ref.current.splice(i, 1);
			}
			callback();
		}
	}
	
	const updateItem = (i, value) => {
		if (ref && 'current' in ref && ref.current) {
			if (uuid && 'uuid' in ref.current) {
				ref.current[uuid].items[i] = value;
			} else {
				ref.current[i] = value;
			}
			callback();
		}
	}
	
	return (
		<>
			{ref && 'current' in ref && ref.current ?
				<>
					<p className={styles.buttonRow}>
						<b>{label}</b>
						<button type="button" onClick={addItem}>Add</button>
					</p>
					<ul className={styles.listItemsList}>
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
			: ''}
		</>
	)
});