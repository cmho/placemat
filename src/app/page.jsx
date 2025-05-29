import SetupScreen from './components/SetupScreen';
import Overlay from './components/Overlay';
import styles from "./page.module.css";
import { Suspense } from 'react';

export default async function Home({params, searchParams}) {
	const data = await searchParams;
	const RenderPage = () => {
		
		if (Object.keys(data).length === 0) {
			return(
				<SetupScreen />
			);
		} 
		return(
			<Overlay params={data} />
		);
	}
	
	return(
		<Suspense>
			<RenderPage />
		</Suspense>
	);
}
