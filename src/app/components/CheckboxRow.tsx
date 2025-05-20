'use client';

import { forwardRef } from 'react';
import styles from '../page.module.css';

interface Props {
  id: string,
	children: React.ReactNode,
	label: string,
	value?: string,
	help?: string,
	ref?: any,
	callback?: any
};

export default forwardRef<HTMLInputElement, Props>(function FormRow (props, ref) {
	const { id, children, label, value, help, callback } = props;
	console.log(ref);
	return (
		<div className="form-row">
			<label htmlFor={id}>{label} <input type="checkbox" id={id} name={id} defaultChecked={value} ref={ref} onChange={callback} /></label>
			{ help ? <p className={styles.help}>{help}</p> : '' }
			{children}
		</div>
	);
});