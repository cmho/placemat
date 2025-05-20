'use client';

export default function FormSection (props) {
	const { title, children } = props;
	return(
		<details>
			<summary><h2>{title}</h2></summary>
			{children}
		</details>
	)
}