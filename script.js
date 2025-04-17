// ============ SETTINGS ============= //

const port = 8080;
const overlayImage = 'freyaamari.png';
const overlayWidth = '1920px';
const overlayHeight = '1080px';
const chatBoxX = '100px';
const chatBoxY = '100px';
const chatBoxWidth = '400px';
const chatBoxHeight = '600px';
const msgsToShow = 5;
const defaultColor = { red: 255, green: 255, blue: 255 };

// ================================== //

let cursor = 0;
let even = true;

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

const writeMessages = async () => {
	const resp = await fetch('//localhost:'+port);
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
    messageList.append(msgContainer);
    if (messageList.querySelectorAll('li').length > msgsToShow) {
      messageList.querySelector('li').remove();
    }
		even = !even;
		cursor = Date.parse(msg.createdAt) > cursor ? Date.parse(msg.createdAt) : cursor;
	});
	setTimeout(writeMessages, 1000);
};

writeMessages();