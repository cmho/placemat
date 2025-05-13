'use client';

import FormElement from './FormElement.tsx';
import styles from '../page.module.css';

type Opt = {
	label: string,
	value: any
};

interface Props {
  id: string,
	label: string,
	type: string,
	value?: string,
	options?: Opt[],
	help?: string,
	ref?: any,
	callback?: any
};

export default function FormRow ({children, ...props}: {children: React.ReactNode, props: Props}) {
	const { id, label, type, value, options, help, callback, ref } = props;
	return (
		<div className="form-row">
			<label htmlFor={id}>{label}</label>
			{ help ? <p className={styles.help}>{help}</p> : '' }
			<FormElement id={id} type={type} options={options} value={value} callback={callback} ref={ref} />
			{children}
		</div>
	);
}