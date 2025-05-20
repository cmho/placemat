'use client';

import { forwardRef } from 'react';
import styles from '../page.module.css';

type Opt = {
	label: string,
	value: any
};

interface Props {
  id: string,
	children: React.ReactNode,
	label: string,
	value: string,
	options: Opt[],
	help?: string,
	ref: any,
	callback: any
};

export default forwardRef<HTMLSelectElement, Props>(function FormRow (props, ref) {
	const { id, children, label, value, options, help, callback } = props;
	return (
		<div className="form-row">
			<label htmlFor={id}>{label}</label>
			{ help ? <p className={styles.help}>{help}</p> : '' }
			<select name={id} id={id} defaultValue={value} ref={ref} onChange={callback}>
				{options.map((opt) => {
					const { value, label } = opt;
					return(<option key={value} value={value}>{label}</option>);
				})}
			</select>
			{children}
		</div>
	);
});