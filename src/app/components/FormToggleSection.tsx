'use client';

import { useState } from 'react';

interface Props {
	id: string,
	label: string,
	groupName: string,
	isOn: boolean,
	ref?: any
}

export default function FormToggleSection ({children, ...props}: {children: React.ReactNode, props: Props}) {
	const { id, label, groupName, isOn, ref } = props;
	const [toggle, setToggle] = useState(isOn ? isOn : false);
	return (
		<div className="form-row">
			<label htmlFor={id}>{label} <input type="checkbox" defaultChecked={toggle} name={id} id={id} onChange={() => { console.log(toggle); setToggle(!toggle);}} ref={ref} /></label>
			{ toggle ? 
				<div className={groupName}>
					{children}
				</div>
			: '' }
		</div>
	)
}