'use client';

import SetupScreen from './components/SetupScreen.tsx';
import Overlay from './components/Overlay.tsx';
import styles from "./page.module.css";
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Home() {
	const params = useSearchParams();
	const isObjectEmpty = (obj) => {
	  return (
	    obj &&
	    Object.keys(obj).length === 0 &&
	    obj.constructor === Object
	  );
	};
	
	if (isObjectEmpty(params)) {
		return(<SetupScreen />);
	}
	return(<Overlay params={params} />);
}
