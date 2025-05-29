'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import Follower from './Follower';
import Feed from './Feed';
import FollowerAlerts from './FollowerAlerts';
import Widgets from './Widgets';

import styles from '../overlay.module.css';

export default function Overlay (props) {
	const { params } = props;
	
	function OverlayContent() {
		const username = params.username;
		const [messages, setMessages] = useState([]);
		const [widgets, setWidgets] = useState({});
		let evenodd = "odd";
		const customHTMLRef = useRef(null);
		const listRef = useRef(null);
		const messagesRef = useRef([]);
		let messageCache = [];

		// regexes for parsing incoming messages
		const isTimerStart = new RegExp("^!start ([a-zA-Z0-9_\-]+)$");
		const isTimerPause = new RegExp("^!pause ([a-zA-Z0-9_\-]+)$");
		const isTimerStop = new RegExp("^!stop ([a-zA-Z0-9_\-]+)$");
		const isListAdd = new RegExp("^!add ([a-zA-Z0-9_\-]+) (.+)$");
		const isListDone = new RegExp("^!done ([a-zA-Z0-9_\-]+) ([0-9]+)$");
		const isUpdateProgress = new RegExp("^!update ([a-zA-Z0-9_\-]+) ([0-9]+)$");
		const isHideWidget = new RegExp("^!hide ([a-zA-Z0-9_\-]+)$");
		const isShowWidget = new RegExp("^!show ([a-zA-Z0-9_\-]+)$");
	
		let cursor = 0;
		
		const getUuidByIdentifier = (id) => {
			let counter = -1;
			Object.values(widgets).forEach((elt, i) => {
				if (elt.id === id) {
					counter = i;
					return;
				}
			});
			if (counter > -1) {
				return Object.keys(widgets)[counter];
			}
			return null;
		}
		
		const handleMessage = (msgContent, author, msgTime) => {
			const newRecord = {
				message: msgContent,
				author: author,
				messageTime: msgTime,
				alternateClass: evenodd
			};
			
			evenodd = evenodd === "even" ? "odd" : "even";
			
			messageCache.push(newRecord);
			messageCache.sort((a, b) => {
				if (a.messageTime > b.messageTime) return -1;
				return 1;
			});
			setMessages(messageCache.slice(0, params.msgCount));
		}
		
		const getMessageActions = (messageText) => {
			if (isTimerStart.test(messageText)) {
				const messageMatch = messageText.match(isTimerStart);
				const id = messageMatch[1];
			} else if (isTimerStop.test(messageText)) {
				const messageMatch = messageText.match(isTimerStop);
				const id = messageMatch[1];
			} else if (isTimerPause.test(messageText)) {
				const messageMatch = messageText.match(isTimerPause);
				const id = messageMatch[1];
				widgetData[uuid].timer
			} else if (isListAdd.test(messageText)) {
				const messageMatch = messageText.match(isTimerStart);
				const id = messageMatch[1];
				const listItem = messageMatch[2];
				widgetData[uuid].items.push(listItem);
			} else if (isListDone.test(messageText.message)) {
				const messageMatch = messageText.match(isTimerStart);
				const id = messageMatch[1];
				const listItem = parseInt(messageMatch[2]);
				const uuid = getUuidFromIdentifier(id);
				widgetData[uuid].items.splice(listItem, 1);
			} else if (isUpdateProgress.test(messageText)) {
				const messageMatch = messageText.match(isTimerStart);
				const id = messageMatch[1];
				const amount = parseInt(messageMatch[2]);
				const uuid = getUuidFromIdentifier(id);
				widgetData[uuid].current = amount;
			} else if (isHideWidget.test(messageText)) {
				const messageMatch = messageText.match(isTimerStart);
				const id = messageMatch[1];
				const uuid = getUuidFromIdentifier(id);
				widgetData[uuid].show = false;
			} else if (isShowWidget.test(messageText)) {
				const messageMatch = messageText.match(isTimerStart);
				const id = messageMatch[1];
				const uuid = getUuidFromIdentifier(id);
				widgetData[uuid].show = true;
			}
		}
		
		useEffect(() => {
			messagesRef.current = (listRef.current ? Array.from(listRef?.current?.children) : []).map((elt) => {
				if (elt.offsetTop > 0) {
					return 1;
				}
				return 0;
			});
		}, [messages])
		
		useEffect(() => {
			// add custom html
			customHTMLRef.current.innerHTML = params.customhtml;
			
			// set up widgets
			const widgetData = {};
			params.uuids?.forEach((uuid, i) => {
				const type = params["widgets_"+uuid+"_type"];
				const data = {};
				data['id'] = params["widgets_"+uuid+"_id"];
				data['heading'] = params["widgets_"+uuid+"_heading"];
				data['posx'] = params['widgets_'+uuid+'_x'];
				data['posy'] = params['widgets_'+uuid+'_y'];
				data['width'] = params['widgets_'+uuid+'_w'];
				data['height'] = params['widgets_'+uuid+'_h'];
				data['foreground'] = params['widgets_'+uuid+'_foreground'];
				data['background'] = params['widgets_'+uuid+'_background'];
				data['show'] = true;
				if (type === 'list') {
					data['items'] = params.getAll('widgets_'+uuid+'_items') ?? [];
				} else if (type === 'progress') {
					data['current'] = params['widgets_'+uuid+'_current'];
					data['maximum'] = params['widgets_'+uuid+'_maximum'];
					data['style'] = params['widgets_'+uuid+'_style'];
				} else if (type === 'timer') {
					data['timer'] = null;
					data['defaultTime'] = params['widgets_'+uuid+'_defaultTime'];
				}
				widgetData[uuid] = data;
			});
			
			setWidgets(widgetData);
			
			// get chat messages from websocket relay
			const sock = new WebSocket('/api/streamMessages/'+params.username);
			sock.onerror = (e) => {
				console.error(e);
			}
			sock.onmessage = (e) => {
				const data = JSON.parse(e.data);
				const messageText = data.message;
				const author = data.author;
				const color = data.color || params.color;
				const msgTime = data.messageTime;
				const msgContent = params.customtemplate !== ""
					? params.customtemplate.replace("{author}", author).replace("{message}", messageText).replace("{color}", `rgba(${color.red}, ${color.blue}, ${color.green})`)
					: `<span class="author" style="color: ${`rgba(${color.red}, ${color.blue}, ${color.green})`}">${author}</span><div class="message">${messageText}</div>`;
				handleMessage(msgContent, author, msgTime);
				if (params.username === author) getMessageActions(messageText);
			};
		}, []);
	
		return(
			<main className={styles.overlayPage}>
				<img src={params.image} width={params.imagew} height={params.imageh} className={styles.overlay} id="overlay" />
				<div id="messagesWrapper" className={styles.messagesWrapper} style={{left: params.chatx+"px", top: params.chaty+"px", width: params.chatw+"px", height: params.chath+"px"}}>
					<MessageList messages={messages} listRef={listRef} messagesRef={messagesRef} />
				</div>
				{params.showFollower === "on" ? 
					<Follower username={params.username} width={params.followerw} height={params.followerh} posx={params.followerx} posy={params.followery} fontSize={params.followersize} color={params.followercolor} displayType={params.followerdisplay} />
				: ''}
				{params.showFeed === "on" ? 
					<Feed uri={params.feeduri} limit={params.feedlimit} />
				: ''}
				{params.showFollowerAlerts === "on" ?
					<FollowerAlerts username={params.username} width={params.alertw} height={params.alerth} posx={params.alertsx} posy={params.alerty} color={params.alertcolor} images={params.alertImages_items} alertText={params.alerttext} />
				: ''}
				<Widgets widgetData={widgets} />
				<div ref={customHTMLRef}></div>
				<style type="text/css">
					{params.css}
				</style>
			</main>
		);
	}
	
	return(
		<Suspense>
			<OverlayContent />
		</Suspense>
	);
}