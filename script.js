const params = new URLSearchParams(window.location.search);
const hexRe = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(params.get("color"));

// ============ SETTINGS ============= //

const username = params.get("username");
const overlayImage = params.get("image") ? params.get("image") : 'freyaamari.png';
const overlayWidth = params.get("imagew") ? params.get("imagew")+"px" : "1920px";
const overlayHeight = params.get("imageh") ? params.get("imageh")+"px" : "1080px";
const chatBoxX = params.get("chatx") ? params.get("chatx")+"px" : "1500px";
const chatBoxY = params.get("chaty") ? params.get("chaty")+"px" : "20px";
const chatBoxWidth = params.get("chatw") ? params.get("chatw")+"px" : "400px";
const chatBoxHeight = params.get("chath") ? params.get("chath")+"px" : "600px";
const msgsToShow = params.get("msgCount") ? parseInt(params.get("msgCount")) : 5;
const defaultColor = params.get("color") ? { red: parseInt(hexRe[1], 16), green: parseInt(hexRe[2], 16), blue: parseInt(hexRe[3], 16) } : { red: 255, green: 255, blue: 255 };
const css = params.get("css") ? params.get("css") : '';
const customhtml = params.get("customhtml") ? params.get("customhtml") : '';
const customMessage = params.get("customtemplate") ? params.get("customtemplate") : '';
const showLatestFollower = params.get("showfollower") ? (params.get("showfollower") === 'true' ? true : false) : false;
const followerDisplayType = params.get("followerdisplay") ? params.get("followerdisplay") : "handle";
const followerX = params.get("followerx") ? params.get("followerx")+"px" : "1500px";
const followerY = params.get("followery") ? params.get("followery")+"px" : "20px";
const followerFontSize = params.get("followersize") ? params.get("followersize") : "24px";
const followerWidth = params.get("followerw") ? params.get("followerw")+"px" : "200px";
const followerHeight = params.get("followerh") ? params.get("followerh")+"px" : "24px";
const showFeed = params.get("showfeed") ? (params.get("showfeed") === 'true' ? true : false) : false;
const feed = params.get("feeduri") ? params.get("feeduri") : null;
const feedLimit = params.get("feedLimit") ? parseInt(params.get("feedLimit")) : 25;
const feedX = params.get("feedx") ? params.get("feedx")+"px" : '20px';
const feedY = params.get("feedy") ? params.get("feedy")+"px" : '20px';
const feedFontSize = params.get("feedsize") ? params.get("feedsize") : "16px";
const feedWidth = params.get("feedw") ? params.get("feedw")+"px" : "400px";
const feedHeight = params.get("feedh") ? params.get("feedh")+"px" : "600px";

// ================================== //

let cursor = 0;
let feedCursor = 0;
let even = true;

const setupPage = async () => {
	const messageList = document.createElement('ul');
	messageList.id = 'messages';
	messageList.style.position = 'absolute';
	messageList.style.top = chatBoxY;
	messageList.style.left = chatBoxX;
	messageList.style.width = chatBoxWidth;
	messageList.style.height = chatBoxHeight;
	messageList.style.zIndex = 99;
	const overlay = document.createElement('div');
	overlay.style.width = overlayWidth;
	overlay.style.height = overlayHeight;
	overlay.style.backgroundImage = 'url('+overlayImage+')';
	overlay.id = 'overlay';
	overlay.style.position = 'absolute';
	overlay.style.top = 0;
	overlay.style.left = 0;
	overlay.style.zIndex = 1;
	document.body.append(messageList);
	document.body.append(overlay);
	const style = document.createElement('style');
	style.type = 'text/css';
	if (css !== '') {
		style.innerHTML = css;
	} else {
		style.innerHTML = `.author {
	font-weight: bold;
	border: 1px white solid;
	padding: 3px 5px;
	border-radius: 3px;
	display: inline-block;
	background-color: black;
}

.msgContent {
	margin-left: 15px;
  padding: 5px;
  background-color: white;
  color: black;
  border-radius: 5px;
  margin-top: -3px;
}

#feed {
	padding: 10px;
	background-color: rgba(0,0,0,.25);
}

#feed ul {
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  align-content: flex-start;
	gap: 10px;
}

#feed .author {
	display: inline-block;
	font-weight: bold;
	background-color: white;
	padding: 3px 5px;
	border-radius: 20px;
	color: black;
}

#feed .feedmsg {
	display: block;
	margin-top: 5px;
	font-weight: normal;
}`;
	}
	document.head.append(style);
	document.body.append(customhtml);
	if (showLatestFollower) {
		const follower = document.createElement("div");
		follower.id = "latestFollower";
		follower.style.position = "absolute";
		follower.style.top = followerY;
		follower.style.left = followerX;
		follower.style.fontSize = followerFontSize;
		follower.style.width = followerWidth;
		follower.style.height = followerHeight;
		follower.style.zIndex = 3;
		const followerReq = await fetch('https://public.api.bsky.app/xrpc/app.bsky.graph.getFollowers?actor='+username);
		const followerData = await followerReq.json();
		if (followerData.followers.length > 0) {
			follower.textContent = followerDisplayType === 'handle' ? followerData.followers[0].handle : followerData.followers[0].displayName;
		}
		document.body.append(follower);
	}
	if (showFeed && feed) {
		const feedElt = document.createElement('div');
		feedElt.id = "feed";
		feedElt.style.position = "absolute";
		feedElt.style.top = feedY;
		feedElt.style.left = feedX;
		feedElt.style.fontSize = feedFontSize;
		feedElt.style.width = feedWidth;
		feedElt.style.height = feedHeight;
		feedElt.style.zIndex = 3;
		document.body.append(feedElt);
	}
};

const writeMessages = async () => {
	const resp = await fetch('https://spoverlayapi.veryroundbird.house/'+username);
	const res = await resp.json();
	res.slice(-1*msgsToShow).filter((msg) => {
		return 'record' in msg && 'createdAt' in msg.record && Date.parse(msg.record.createdAt) > cursor;
	}).map((msg) => {
		return {
			author: msg.author.handle,
			message: msg.record.text,
			color: 'chatProfile' in msg ? msg.chatProfile.color : defaultColor,
			createdAt: msg.record.createdAt
		};
	}).forEach((msg) => {
    const author = msg.author;
    const text = msg.message;
    const color = msg.color;
    const msgContainer = document.createElement('li');
		const messageList = document.getElementById('messages');
    msgContainer.classList.add('message');
		msgContainer.classList.add(even ? 'even' : 'odd');
		messageList.append(msgContainer);
    const authorLabel = document.createElement('span');
    authorLabel.classList.add('author');
    authorLabel.textContent = author;
    authorLabel.style.color = 'rgb('+color.red+', '+color.green+', '+color.blue+')';
		if (customMessage === '') {
	    const messageBox = document.createElement('div');
	    messageBox.classList.add('msgContent');
	    messageBox.innerHTML = text;
	    msgContainer.append(authorLabel);
	    msgContainer.append(messageBox);
		} else {
			msgContainer.innerHTML = customMessage.replace("{author}", authorLabel.outerHTML).replace("{message}", text);;
		}
		let liHeight = Array.from(document.querySelectorAll('#messages li')).reduce((a,b) => {
			return a+b.offsetHeight;
		}, 0);
		while (liHeight > parseInt(chatBoxHeight.replace("px", ""))) {
			messageList.querySelector('li').remove();
			liHeight = Array.from(document.querySelector('#messages li')).reduce((a,b) => {
				return a+b.offsetHeight;
			}, 0);
		}
    if (messageList.querySelectorAll('li').length > msgsToShow) {
			messageList.querySelector('li').remove();
    }
		even = !even;
		cursor = Date.parse(msg.createdAt) > cursor ? Date.parse(msg.createdAt) : cursor;
	});
	setTimeout(writeMessages, 1000);
};

const writeFeedMessages = async () => {
	const feedMessages = await fetch("https://public.api.bsky.app/xrpc/app.bsky.feed.getFeed?feed="+feed);
	const feedRes = await feedMessages.json();
	const feedData = feedRes.feed.filter((msg) => {
		return 'record' in msg.post && 'createdAt' in msg.post.record && Date.parse(msg.post.record.createdAt) > cursor;
	});
	if (feedData.length > 0) {
		const feedElt = document.getElementById('feed');
		const feedList = document.createElement('ul');
		feedElt.append(feedList);
		feedData.forEach((msg, i) => {
			if (i > feedLimit) return;
			if (feedList.offsetHeight > feedElt.offsetHeight) {
				const lastchild = feedList.querySelector('li:last-child');
				if (lastchild) lastchild.remove();
				return;
			}
			const msgCont = document.createElement('li');
			const author = document.createElement('span');
			author.classList.add('author');
			author.textContent = msg.post.author.handle;
			msgCont.append(author);
			const msgText = document.createElement('span');
			msgText.classList.add('feedmsg');
			msgText.textContent = msg.post.record.text;
			msgCont.append(msgText);
			feedList.append(msgCont);
		});
	}
	setTimeout(writeFeedMessages, 1000);
}

const loadPresets = () => {
	const presets = JSON.parse(localStorage.getItem("presets"));
	const presetSel = document.getElementById('presets');
	if (presets) {
		Object.keys(presets).forEach((preset) => {
			const option = document.createElement('option');
			option.setAttribute('data-settings', presets[preset]);
			option.value = preset;
			option.textContent = preset;
			presetSel.append(option);
		});
	} else {
		localStorage.setItem("presets", JSON.stringify({}));
	}
};

const createPresetListeners = () => {
	document.getElementById('presets').addEventListener('change', (e) => {
		const presets = JSON.parse(localStorage.getItem("presets"));
		const preset = presets[e.target.value];
		Object.keys(preset).forEach((item) => {
			const elt = document.getElementById(preset[item].id);
			switch (preset[item].type) {
			case "text":
			case "number":
			case "select":
				elt.value = preset[item].value;
				break;
			case "checkbox":
				if (preset[item].value === true) {
					elt.setAttribute("checked", "checked");
				} else {
					elt.removeAttribute("checked");
				}
				if (elt.id === 'showfollower') {
					if (elt.checked) {
						document.getElementById('followerControls').style.display = "grid";
					} else {
						document.getElementById('followerControls').style.display = "none";
					}
				}
				break;
			case "textarea":
				elt.innerHTML = preset[item].value;
				break;
			default:
				break;
			}
		});
	});
	
	document.getElementById('preset-update').addEventListener('click', (e) => {
		e.preventDefault();
		const preset = document.getElementById('presets');
		let presets = JSON.parse(localStorage.getItem("presets"));
		const presetData = Array.from(document.querySelectorAll('form input, form textarea, form select')).map((elt) => {
			let data = {};
			data.id = elt.id;
			if (elt.tagName.toLowerCase() === "input") {
				data.type = elt.type;
				if (elt.type !== "checkbox" && elt.type !== "radio") {
					data.value = elt.value;
				} else if (elt.type === "checkbox") {
					data.value = elt.checked ? true : false;
				}
			} else {
				data.type = elt.tagName.toLowerCase();
				if (elt.tagName.toLowerCase() === "textarea") {
					data.value = elt.value;
				} else if (elt.tagName.toLowerCase() === "select") {
					data.value = elt.value;
				}
			}
			return data;
		});
		if (preset.value === "") {
			const newPresetName = document.getElementById('renamePreset').value !== "" ? document.getElementById('renamePreset').value : 'New Preset '+(presets.length+1);
			if (newPresetName in presets) {
				alert('Preset names have to be unique! Please pick a different one.');
				return false;
			}
			presets[newPresetName] = presetData;
		} else {
			presets[preset.value] = presetData;
		}
		localStorage.setItem("presets", JSON.stringify(presets));
	});
}

const pageSetup = async () => {
	if (window.location.search !== "") {
		await setupPage();
		writeMessages();
		if (showFeed) {
			writeFeedMessages();
		}
	} else {
		const content = await fetch('./homepage.txt');
		const html = await content.text();
		document.body.innerHTML = html;
		createPresetListeners();
		loadPresets();
	}
}

pageSetup();