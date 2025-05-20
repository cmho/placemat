'use client';

import SetupScreen from './components/SetupScreen';
import Overlay from './components/Overlay';
import styles from "./page.module.css";
import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Home() {
	const RenderPage = () => {
		const params = useSearchParams();
		
		if (params.size === 0) {
			return(
				<SetupScreen />
			);
		} 
		return(
			<Overlay />
		);
	}
	
	return(
		<Suspense>
			<RenderPage />
		</Suspense>
	);
}
