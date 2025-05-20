'use client';

import { forwardRef } from 'react';
import styles from '../page.module.css';

interface Props {
  id: string,
	children: React.ReactNode,
	label: string,
	type: string,
	value: string,
	help?: string,
	ref?: any,
	callback?: any
};

export default forwardRef<HTMLInputElement, Props>(function FormRow (props, ref) {
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