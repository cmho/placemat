'use client';

import { useSearchParams } from 'next/navigation';

export default function Overlay () {
	const params = useSearchParams();
	
	return(
		<main className="overlay">
			<img src={params.get("image")} width={params.get("imagew")} height={params.get("imageh")} className="overlay" />
			<div className="messages" style={{left: params.get("chatx"), top: params.get("chaty"), width: params.get("chatw"), height: params.get("chath")}}>
			</div>
			<div dangerouslySetInnerHTML={{__html: params.get("customhtml")}}></div>
			<style type="text/css">
				{params.get("css")}
			</style>
		</main>
	);
}