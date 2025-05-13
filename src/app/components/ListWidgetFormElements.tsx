'use client';

import FormRow from './FormRow.tsx';
import { useState } from 'react';

interface Props {
	id: string,
	key: number,
	label: string,
	items: string[]
}

export default function ListWidgetFormElements ({children, ...props}: {children: React.ReactNode, props: Props}) {
	const { id, label, items } = props;
	const [listItems, setListItems] = useState(items ? [...items] : []);
	
	const addItem = () => {
		setListItems([...listItems, ""]);
	}
	
	const removeItem = (i) => {
		setListItems([...listItems].splice(i, 1));
	}
	
	return (<div className="form-row">
		<h5>List Widget</h5>
		<FormRow id={id} type="text" label="Identifier" help="Should be all lowercase, with no spaces or punctuation." />
		<button type="button" onClick={addItem}>Add</button>
		<ul>
			{listItems.map((item, i) => {
				return (
					<li key={i}>
						<input type="text" defaultValue={item} name={id+[]} /> <button type="button" onClick={() => removeItem(i)}>Remove</button>
					</li>
				)
			})}
		</ul>
	</div>)
}