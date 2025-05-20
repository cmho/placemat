'use client';

import { forwardRef } from 'react';
import styles from '../page.module.css';

export default forwardRef(function FormRow (props, ref) {
	const { id, children, label, value, help, callback } = props;
	return (
		<div className="form-row">
			<label htmlFor={id}>{label}</label>
			{ help ? <p className={styles.help}>{help}</p> : '' }
			<textarea name={id} id={id} onChange={callback} ref={ref} defaultValue={value} />
			{children}
		</div>
	);
});