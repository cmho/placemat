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

export default forwardRef<HTMLTextareaElement, Props>(function FormRow (props, ref) {
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