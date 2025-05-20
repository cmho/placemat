'use client';

import styles from '../page.module.css';
import { useState, useEffect, forwardRef } from 'react';

export default forwardRef(function FormToggleSection (props, ref) {
	const { id, children, label, groupName, isOn, callback } = props;
	const [toggle, setToggle] = useState(isOn);
	
	useEffect(() => {
		if (ref && 'current' in ref && ref.current) {
			ref.current.checked = isOn;
		}
		setToggle(isOn);
	}, [isOn])
	
	return (
		<div className="form-row">
			{(ref && 'current' in ref && ref.current) && <>
				<label htmlFor={id}>{label} <input type="checkbox" defaultChecked={isOn} name={id} id={id} onChange={() => { setToggle(ref?.current?.checked ?? false); callback(); }} ref={ref} /></label>
				{ toggle ? 
					<div className={styles[groupName]}>
						{children}
					</div>
				: '' }
			</>}
		</div>
	)
});