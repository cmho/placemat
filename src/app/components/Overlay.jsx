'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { socketListener, getFeedMessages, getLatestFollower, getMessages } from './SocketListener';
import ProgressBar from './ProgressBar';
import List from './List';
import Timer from './Timer';
import styles from '../overlay.module.css';

export default function Overlay () {
	function OverlayContent() {
		const params = useSearchParams();
		const [messages, setMessages] = useState([]);
		const [feedMessages, setFeedMessages] = useState([]);
		const [latestFollower, setLatestFollower] = useState("");
		const [counter, setCounter] = useState('even');
		const [widgets, setWidgets] = useState(() => {
			const widgetData = {};
			params.getAll("widget_uuids").forEach((uuid, i) => {
				const type = params.get("widgets_"+uuid+"_type");
				if (type === 'list') {
					widgetData[uuid] = {items: params.getAll('widgets_'+uuid+'_items') ?? []};
				} else if (type === 'progress') {
					widgetData[uuid] = {current: params.get("widgets_"+uuid+"_current")};
				} else if (type === 'timer') {
					widgetData[uuid] = {timer: null};
				}
			});
		});
		const feedOuterRef = useRef(null);
		const feedInnerRef = useRef(null);
		const messagesOuterRef = useRef(null);
		const messagesInnerRef = useRef(null);

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
	
		useEffect(() => {
			setInterval(async () => {
				const newMessages = await getMessages(params.get("username"), params.get("msglimit"));
				if (newMessages && newMessages.length > 0) {
					setMessages([...messages, ...(newMessages.filter((msg) => Date.parse(msg.post.record.createdAt) > cursor))]);
				}
				const widgetUpdates = {...widgets};
				newMessages.filter((msg) => {
					return (msg.post.author.handle === username)
				}).forEach((record) => {
					const msg = record.post.record.text;
					if (isTimerStart.test(msg)) {
						const messageMatch = msg.match(isTimerStart);
						const id = messageMatch[1];
					} else if (isTimerStop.test(msg)) {
						const messageMatch = msg.match(isTimerStop);
						const id = messageMatch[1];
					} else if (isTimerPause.test(msg)) {
						const messageMatch = msg.match(isTimerPause);
						const id = messageMatch[1];
					} else if (isListAdd.test(msg)) {
						const messageMatch = msg.match(isTimerStart);
						const id = messageMatch[1];
						const listItem = messageMatch[2];
					} else if (isListDone.test(msg.message)) {
						const messageMatch = msg.match(isTimerStart);
						const id = messageMatch[1];
						const listItem = parseInt(messageMatch[2]);
					} else if (isUpdateProgress.test(msg)) {
						const messageMatch = msg.match(isTimerStart);
						const id = messageMatch[1];
						const amount = parseInt(messageMatch[2]);
					} else if (isHideWidget.test(msg)) {
						const messageMatch = msg.match(isTimerStart);
						const id = messageMatch[1];
					} else if (isShowWidget.test(msg)) {
						const messageMatch = msg.match(isTimerStart);
						const id = messageMatch[1];
					}
				});
			}, 500);
		}, []);
	
		useEffect(() => {
			if (params.get("showFeed")) {
				setInterval(async () => {
					const feedMsgs = await getFeedMessages(params.get("feeduri"));
					setFeedMessages(feedMsgs);
				}, 1000);
			}
			if (params.get("showFollower")) {
				setInterval(async () => {
					const follower = await getLatestFollower(params.get("username"));
					setLatestFollower((params.get("followerDisplayType") === 'handle') ? follower.handle : follower.displayName);
				}, 5000);
			}
		}, []);
	
		return(
			<main className={styles.overlayPage}>
				<img src={params.get("image")} width={params.get("imagew")} height={params.get("imageh")} className={styles.overlay} id="overlay" />
				<div id="messagesWrapper" className={styles.messagesWrapper} style={{left: params.get("chatx")+"px", top: params.get("chaty")+"px", width: params.get("chatw")+"px", height: params.get("chath")+"px"}}>
					<ul id="messages" className={styles.messages}>
					{messages ? messages.slice(-1*params.get("msgcount")).map((msg) => {
						<li>
							{msg.data.content}
						</li>
					}) : ''}
					</ul>
				</div>
				{params.get("showFollower") ? 
					<div id="latestFollower" className={styles.latestFollower} style={{left: (params.get("followerx") ?? 0)+"px", top: (params.get("followery") ?? 0)+"px", width: (params.get("followerw") ?? 0)+"px", height: (params.get("followerh") ?? 0)+"px", fontSize: params.get("followersize") ?? "24px", color: params.get("followercolor") ?? '#000000'}}>
						{latestFollower}
					</div>
				: ''}
				{params.get("showFeed") ? 
					<div id="feed" className="feed">
						<ul>
							{messages.slice(-1*parseInt(params.get("feedlimit"))).map((msg) => {
								return(
									<li>
										<span className="author">{msg.author}</span>
										<span className="feedMsg">{msg.message}</span>
									</li>
								)
							})}
						</ul>
					</div>
				: ''}
				{params.getAll("widget_uuids") ? params.getAll("widget_uuids").map((uuid, i) => {
					const id = params.get("widgets_"+uuid+"_id");
					const foreground = params.get("widgets_"+uuid+"_foreground");
					const width = params.get("widgets_"+uuid+"_w");
					const height = params.get("widgets_"+uuid+"_h");
					const posx = params.get("widgets_"+uuid+"_x");
					const posy = params.get("widgets_"+uuid+"_y");
					const type = params.get("widgets_"+uuid+"_type");
					const heading = params.get("widgets_"+uuid+"_heading");
					if (type === 'progress') {
						const background = params.get("widgets_"+uuid+"_background");
						const current = params.get("widgets_"+uuid+"_current");
						const maximum = params.get("widgets_"+uuid+"_maximum");
						const style = params.get("widgets_"+uuid+"_style");
						return (
							<ProgressBar key={i} id={id} foreground={foreground} background={background} width={width} height={height} posx={posx} posy={posy} current={current} maximum={maximum} style={style} />
						)
					} else if (type === 'list') {
						const items = params.getAll("widgets_"+uuid+"_items");
						return (
							<List key={i} id={id} heading={heading} color={foreground} width={width} height={height} posx={posx} posy={posy} items={items} />
						)
					} else if (type === 'timer') {
						const defaultTime = params.get("widgets_"+uuid+"_defaultTime");
						const background = params.get("widgets_"+uuid+"_background");
						return (
							<Timer key={i} id={id} foreground={foreground} background={background} posx={posx} posy={posy} width={width} height={height} heading={heading} timer={null} defaultTime={defaultTime} />
						)
					}
				}) : ''}
				<style type="text/css">
					{params.get("css")}
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