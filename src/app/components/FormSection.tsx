'use client';

interface Props {
	title: string
}

export default function FormSection ({children, ...props}: {children: React.ReactNode, props: Props}) {
	const { title } = props;
	return(
		<details>
			<summary><h3>{title}</h3></summary>
			{children}
		</details>
	)
}