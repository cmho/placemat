const params = new URLSearchParams(window.location.search);
const hexRe = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(params.get("color"));

// ============ SETTINGS ============= //

const overlayImage = params.get("image") ? params.get("image") : 'freyaamari.png';
const overlayWidth = params.get("imagew") ? params.get("imagew")+"px" : "1920px";
const overlayHeight = params.get("imageh") ? params.get("imageh")+"px" : "1080px";
const chatBoxX = params.get("chatx") ? params.get("chatx")+"px" : "100px";
const chatBoxY = params.get("chaty") ? params.get("chaty")+"px" : "100px";
const chatBoxWidth = params.get("chatw") ? params.get("chatw")+"px" : "400px";
const chatBoxHeight = params.get("chath") ? params.get("chath")+"px" : "400px";
const msgsToShow = params.get("msgcount") ? params.get("msgcount") : 5;
const defaultColor = params.get("color") ? { red: parseInt(hexRe[1], 16), green: parseInt(hexRe[2], 16), blue: parseInt(hexRe[3], 16) } : { red: 255, green: 255, blue: 255 };

// ================================== //

let cursor = 0;
let even = true;

const setupPage = () => {
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
}

const writeMessages = async () => {
	const resp = await fetch('//spoverlay.veryroundbird.house/'+params.get("username"));
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
    msgContainer.classList.add('message');
		msgContainer.classList.add(even ? 'even' : 'odd');
    const authorLabel = document.createElement('div');
    authorLabel.classList.add('author');
    authorLabel.textContent = author;
    authorLabel.style.color = 'rgb('+color.red+', '+color.green+', '+color.blue+')';
    const messageBox = document.createElement('div');
    messageBox.classList.add('msgContent');
    messageBox.innerHTML = text;
    msgContainer.append(authorLabel);
    msgContainer.append(messageBox);
		const messageList = document.getElementById('messages');
    messageList.append(msgContainer);
    if (messageList.querySelectorAll('li').length > msgsToShow) {
      messageList.querySelector('li').remove();
    }
		even = !even;
		cursor = Date.parse(msg.createdAt) > cursor ? Date.parse(msg.createdAt) : cursor;
	});
	setTimeout(writeMessages, 1000);
};

const pageSetup = async () => {
	if (window.location.search !== "") {
		setupPage();
		writeMessages();
	} else {
		const content = await fetch('./homepage.txt');
		const html = await content.text();
		console.log(html);
		document.body.innerHTML = html;
	}
}

pageSetup();