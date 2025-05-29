'use client';

import { forwardRef } from 'react';
import styles from '../page.module.css';

export default function FormRow (props) {
	const { id, children, label, value, help, callback, ref } = props;
	
	return (
		<div className="form-row">
			<label htmlFor={id}>{label} <input type="checkbox" id={id} name={id} defaultChecked={value} ref={ref} onChange={callback} /></label>
			{ help ? <p className={styles.help}>{help}</p> : '' }
			{children}
		</div>
	);
};