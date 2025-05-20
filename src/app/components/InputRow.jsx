'use client';

import { forwardRef } from 'react';
import styles from '../page.module.css';

export default forwardRef(function FormRow (props, ref) {
	const { id, children, label, type, value, help, callback } = props;
	
	return (
		<div className="form-row">
			<label htmlFor={id}>{label}</label>
			{ help ? <p className={styles.help}>{help}</p> : '' }
			<input id={id} name={id} type={type} defaultValue={value} onChange={callback} ref={ref} />
			{children}
		</div>
	);
});