'use client';

import { useRef, useEffect, forwardRef } from 'react';
import styles from '../overlay.module.css';

export default function MessageList (props) {
	const { messages, listRef, messagesRef } = props;
	
	return (
		<ul id="messages" className={styles.messages} ref={listRef}>
			{messages ? messages.map((msg, i) => {
				return(
					<li key={i} className={msg.alternateClass} dangerouslySetInnerHTML={{__html: msg.message}} data-datetime={msg.messageTime} style={{opacity: messagesRef?.current[i]}}></li>
				)
			}) : ''}
		</ul>
	)
};