'use client';

import styles from '../page.module.css';
import { useState, useEffect, forwardRef } from 'react';

interface Props {
	id: string,
	children?: React.ReactNode,
	label: string,
	groupName: string,
	isOn: boolean,
	callback: any
}

export default forwardRef<HTMLInputElement, Props>(function FormToggleSection (props, ref) {
	const { id, children, label, groupName, isOn, callback } = props;
	const [toggle, setToggle] = useState(isOn);
	
	useEffect(() => {
		ref.current.checked = isOn;
		setToggle(isOn);
	}, [isOn])
	
	return (
		<div className="form-row">
			<label htmlFor={id}>{label} <input type="checkbox" defaultChecked={isOn} name={id} id={id} onChange={() => { setToggle(ref.current.checked); callback(); }} ref={ref} /></label>
			{ toggle ? 
				<div className={styles[groupName]}>
					{children}
				</div>
			: '' }
		</div>
	)
});