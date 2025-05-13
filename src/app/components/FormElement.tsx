'use client';

type Opt = {
	label: string,
	value: any
}

interface Props {
	id: string,
	type: string,
	value: any,
	callback?: any,
	ref?: any,
	options?: Opt[]
};

export default function FormElement ({children, ...props}: {children: React.ReactNode, props: Props}) {
	const { id, type, value, options, callback, ref } = props;
	switch (type) {
		case "text":
		case "number":
		case "color":
			return (
				<input type={type} id={id} name={id} defaultValue={value} ref={ref} onChange={callback} />
			);
		case "select":
			return (
				<select name={id} id={id} defaultValue={value} ref={ref} onChange={callback}>
					{options.map((opt) => {
						const { value, label } = opt;
						return(<option key={value} value={value}>{label}</option>);
					})}
				</select>
			);
		case "textarea":
			return (
				<textarea name={id} id={id} onChange={callback} ref={ref} defaultValue={value}></textarea>
			);
		case "checkbox":
		return (
			<input type="checkbox" id={id} name={id} checked={value} ref={ref} onChange={callback} />
		)
	}
	return(<></>);
}