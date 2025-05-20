'use client';

interface Props {
	title: string
}

export default function FormSection ({children, ...props}: {children: React.ReactNode, props: Props}) {
	const { title } = props;
	return(
		<details>
			<summary><h2>{title}</h2></summary>
			{children}
		</details>
	)
}