'use client';

import Image from 'next/image';
import InputRow from './InputRow';
import SelectRow from './SelectRow';
import CheckboxRow from './CheckboxRow';
import TextareaRow from './TextareaRow';
import PresetControls from './PresetControls';
import FormToggleSection from './FormToggleSection';
import FormSection from './FormSection';
import RepeatableWidgets from './RepeatableWidgets';
import ListItemFormElements from './ListItemFormElements';
import styles from "../page.module.css";
import { useState, useEffect, useRef } from 'react';

export default function SetupScreen () {
	const [currentPreset, setCurrentPreset] = useState(null);
	const [presets, setPresets] = useState(() => {
		try {
			const storedPresets = localStorage.getItem('presets');
			return JSON.parse(storedPresets);
		} catch {
			return {};
		}
	});
	
	const followerDisplayOptions = [{value: "handle", label: "Handle (e.g. handle.bsky.social)"}, {value: "displayname", label: "Display Name (e.g. Jane Smith)"}];
	
	const presetRef = useRef(null);
	const presetNameRef = useRef(null);
	const usernameRef = useRef(null);
	const imageRef = useRef(null);
	const colorRef = useRef(null);
	const imagewRef = useRef({value: 1920});
	const imagehRef = useRef({value: 1080});
	const msgcountRef = useRef({value: 5});
	const chatxRef = useRef({value: 0});
	const chatyRef = useRef({value: 0});
	const chatwRef = useRef({value: '400px'});
	const chathRef = useRef({value: '600px'});
	const showFollowerRef = useRef({checked: false});
	const followerdisplayRef = useRef({value: 'handle'});
	const followersizeRef = useRef({value: '24px'});
	const followercolorRef = useRef({value: '#000000'});
	const followerxRef = useRef({value: 0});
	const followeryRef = useRef({value: 0});
	const followerwRef = useRef({value: '200px'});
	const followerhRef = useRef({value: '24px'});
	const showFeedRef = useRef({checked: false});
	const feeduriRef = useRef(null);
	const feedlimitRef = useRef({value: 10});
	const feedxRef = useRef({value: 0});
	const feedyRef = useRef({value: 0});
	const feedwRef = useRef({value: '400px'});
	const feedhRef = useRef({value: '600px'});
	const showFollowerAlertsRef = useRef({checked: false});
	const alerttextRef = useRef({value: ''});
	const alertimagesRef = useRef([]);
	const widgetsRef = useRef({});
	const htmlRef = useRef({value: ''});
	const msgTemplateRef = useRef({value: ''});
	const cssRef = useRef({value: ''});
	const exportRef = useRef(null);
	const importRef = useRef(null);
	
	const loadPreset = (name) => {
		if (name === "") {
			setCurrentPreset({widgets: {}});
			return;
		}
		setCurrentPreset({...presets[name]});
		widgetsRef.current = presets[name].widgets;
	}
	
	const getPresetKey = () => {
		if (presetRef.current.value === "") {
			if (presetNameRef.current.value !== "") {
				return presetNameRef.current.value;
			}
			return "New Preset "+(Object.keys(presets).length+1);
		}
		if (presetNameRef.current.value !== "") {
			return presetNameRef.current.value;
		}
		return presetRef.current.value;
	}
	
	const savePreset = () => {
		const newPresets = {...presets};
		const presetKey = getPresetKey();
		newPresets[presetKey] = {...currentPreset};
		if (presetRef.current.value !== "" && presetNameRef.current.value !== "") delete newPresets[presetRef.current.value];
		setPresets(newPresets);
		presetRef.current.value = presetKey;
	}
	
	const updateCurrentPreset = () => {
		setCurrentPreset({
			username: usernameRef.current.value,
			image: imageRef.current.value,
			textColor: colorRef.current.value,
			imagew: imagewRef.current.value ? imagewRef.current.valueAsNumber : 1920,
			imageh: imagehRef.current.value ? imagehRef.current.valueAsNumber : 1080,
			msgcount: msgcountRef.current.value ? msgcountRef.current.valueAsNumber : 5,
			chatx: chatxRef.current.value ? chatxRef.current.valueAsNumber : 0,
			chaty: chatyRef.current.value ? chatyRef.current.valueAsNumber : 0,
			chatw: chatwRef.current.value ? chatwRef.current.valueAsNumber : 400,
			chath: chathRef.current.value ? chathRef.current.valueAsNumber : 600,
			showFollower: showFollowerRef.current?.checked,
			followerdisplay: followerdisplayRef.current?.value,
			followersize: followersizeRef.current?.value,
			followerx: followerxRef.current?.value ? followerxRef.current?.valueAsNumber : 0,
			followery: followeryRef.current?.value ? followeryRef.current?.valueAsNumber : 0,
			followerw: followerwRef.current?.value ? followerwRef.current?.valueAsNumber : 0,
			followerh: followerhRef.current?.value ? followerhRef.current?.valueAsNumber : 0,
			showFeed: showFeedRef.current.checked ? true : false,
			feeduri: feeduriRef.current?.value,
			feedlimit: feedlimitRef.current?.value ? feedlimitRef.current?.valueAsNumber : 0,
			feedx: feedxRef.current?.value ? feedxRef.current?.valueAsNumber : 0,
			feedy: feedyRef.current?.value ? feedyRef.current?.valueAsNumber : 0,
			feedw: feedwRef.current?.value ? feedwRef.current?.valueAsNumber : 0,
			feedh: feedhRef.current?.value ? feedhRef.current?.valueAsNumber : 0,
			showFollowerAlerts: showFollowerAlertsRef.current?.checked,
			alerttext: alerttextRef.current?.value,
			alertimages: alertimagesRef.current,
			widgets: widgetsRef,
			css: cssRef.current.value,
			customhtml: htmlRef.current.value,
			customtemplate: msgTemplateRef.current.value
		});
	}
	
	const getWidgetInfo = (groupName, widgets) => {
		const newCurrent = {...currentPreset, [groupName]: widgets};
		setCurrentPreset(newCurrent);
	}
	
	const exportData = () => {
		const presetsStored = localStorage.getItem("presets");
		const blob = new Blob([presetsStored], {type: 'octet/stream'});
		const url = window.URL.createObjectURL(blob);
		exportRef.current.download = "placemat.json";
		exportRef.current.href = url;
		exportRef.current.click();
		window.URL.revokeObjectURL(url);
	}
	
	const importInitiate = () => {
		importRef.current.click();
	}
	
	const processImport = () => {
		const json = JSON.parse(importRef.current.files[0].getAsDataURL());
		const presetData = {...presets};
		Object.keys(json).forEach((preset) => {
			let keyname = preset;
			while (keyname in presetData) {
				if (confirm('A preset named '+preset+' already exists. Do you want to overwrite?')) {
					break;
				} else {
					keyname = prompt('Enter a new name for this preset:');
				}
			}
			presetData[keyname] = json[preset];
		});
		alert("Import complete!");
	}
	
	useEffect(() => {
		if (JSON.stringify(presets) !== "{}") {
			localStorage.setItem('presets', JSON.stringify(presets));
			return;
		}
		localStorage.setItem('presets', JSON.stringify({}));
	}, [presets]);
	
	return (
    <main className={styles.main}>
			<h1>
				<Image src="/placemat-logo.png" alt="" width={50} height={50} />
				Placemat<span className="tagline">Stream Overlay</span>
			</h1>
			<a className={styles.exportLink} id="exportLink" ref={exportRef}>Export</a>
			<input className={styles.importInput} type="file" id="importInput" ref={importRef} onChange={processImport} />
			<p>for <a href="https://stream.place" target="_blank">stream.place</a> | by <a href="https://bsky.app/profile/veryroundbird.house" target="_blank"><span className="no-sr" aria-hidden="true">🦋</span> veryroundbird.house</a> | <a href="https://ko-fi.com/veryroundbird" target="_blank"><span className="no-sr" aria-hidden="true">☕️</span> donate?</a></p>
			<details className={styles.faq}><summary><h2>FAQ</h2></summary>
			<dl>
				<dt>Will this ever have file upload?</dt>
				<dd>Short answer no; long answer file hosting at scale is easily the most expensive-driving aspect of any web application (right now it doesn't even require its own server) and I'd prefer to keep this a free service so I don't even have to think about payment processing. I also don't want to have to deal with figuring out how to moderate uploads to prevent bad actor usage, which is incredibly laborious and annoying.</dd>
				<dt>Saved presets not being persistent across multiple devices is kind of annoying; will there be user accounts?</dt>
				<dd>Maybe? Watch this space.</dd>
				<dt>Can we get WYSIWYG interface or something where I can drag widgets to place them?</dt>
				<dd>I encourage you to donate to my ko-fi or something so that I can afford to have time to work on that big of an endeavor!</dd>
				<dt>Will you add [feature]?</dt>
				<dd>Submit an issue on the <a href="https://tildegit.org/smallbird/streamplace-overlay" target="_blank">git repo</a> or just @ me on bsky and I'll consider it!</dd>
				<dt>Is this officially affiliated with Stream.Place?</dt>
				<dd>No, this is just my little independent project because I see an API and I want to fuck around with it.</dd>
				<dt>What is this app running on?</dt>
				<dd>It was originally just running vanilla javascript with a client and server component but then I realized it was actually a really good use case for React. So now it's running on React + Next.js because people keep asking if I know Next.js so I figured I ought to learn it.</dd>
				<dt>Can I hire you for something?</dt>
				<dd>PLEASE. I am a freelancer and I <i>love</i> clients let's talk</dd>
			</dl>
			</details>
			<div className={styles.presetControls}>
				<div>
					<label htmlFor="presets">Preset <button type="button" onClick={importInitiate}>Import</button> <button type="button" onClick={exportData}>Export</button></label>
					<select name="presets" id="presets" ref={presetRef} onChange={() => loadPreset(presetRef.current.value)}>
						<option key="new" value="">New...</option>
							{presets ? Object.keys(presets)?.map((p, i) => {
								return(
									<option value={p} key={i}>
										{p}
									</option>
								)
							}) : null}
					</select>
				</div>
				<div>
					<label htmlFor="renamePreset">Preset Name</label>
					<input type="text" name="renamePreset" id="renamePreset" ref={presetNameRef} />
				</div>
			</div>
			<form method="GET" className={styles.settingsForm}>
				<InputRow id="username" label="Username" type="text" ref={usernameRef} value={currentPreset?.username} callback={() => updateCurrentPreset()} />
				<InputRow id="image" label="Image Overlay" type="text" ref={imageRef} value={currentPreset?.image} callback={() => updateCurrentPreset()} />
				<InputRow id="color" label="Default Text Color" type="color" ref={colorRef} value={currentPreset?.textColor} callback={() => updateCurrentPreset()} />
				<InputRow id="imagew" label="Image Width" type="number" value={currentPreset?.imagew} ref={imagewRef} callback={() => updateCurrentPreset()} />
				<InputRow id="imageh" label="Image Height" type="number" value={currentPreset?.imageh} ref={imagehRef} callback={() => updateCurrentPreset()} />
				<InputRow id="msgcount" label="Message Count" type="number" value={currentPreset?.msgcount} ref={msgcountRef} callback={() => updateCurrentPreset()} />
				<InputRow id="chatx" label="Chatbox Position X" type="number" value={currentPreset?.chatx} ref={chatxRef} callback={() => updateCurrentPreset()} />
				<InputRow id="chaty" label="Chatbox Position Y" type="number" value={currentPreset?.chaty} ref={chatyRef} callback={() => updateCurrentPreset()} />
				<InputRow id="chatw" label="Chatbox Width" type="number" value={currentPreset?.chatw} ref={chatwRef} callback={() => updateCurrentPreset()} />
				<InputRow id="chath" label="Chatbox Height" type="number" value={currentPreset?.chath} ref={chathRef} callback={() => updateCurrentPreset()} />
				<FormSection title="Widgets">
					<FormToggleSection id="showFollower" label="Show Latest Follower?" groupName="followerControls" isOn={currentPreset?.showFollower} ref={showFollowerRef} callback={() => updateCurrentPreset()}>
						<SelectRow id="followerdisplay" label="Follower Display Type" options={followerDisplayOptions} value={currentPreset?.followerdisplay} ref={followerdisplayRef} callback={() => updateCurrentPreset()} />
						<InputRow id="followersize" label="Follower Font Size" type="text" value={currentPreset?.followersize} ref={followersizeRef} callback={() => updateCurrentPreset()} />
						<InputRow id="followercolor" label="Follower Font Color" type="color" value={currentPreset?.followercolor} ref={followercolorRef} callback={() => updateCurrentPreset()} />
						<InputRow id="followerx" label="Follower Position X" type="number" value={currentPreset?.followerx} ref={followerxRef} callback={() => updateCurrentPreset()} />
						<InputRow id="followery" label="Follower Position Y" type="number" value={currentPreset?.followery} ref={followeryRef} callback={() => updateCurrentPreset()} />
						<InputRow id="followerw" label="Follower Width" type="number" value={currentPreset?.followerw} ref={followerwRef} callback={() => updateCurrentPreset()} />
						<InputRow id="followerh" label="Follower Height" type="number" value={currentPreset?.followerh} ref={followerhRef} callback={() => updateCurrentPreset()} />
					</FormToggleSection>
					<FormToggleSection id="showFeed" label="Show Feed?" groupName="feedControls" isOn={currentPreset?.showFeed} ref={showFeedRef} callback={() => updateCurrentPreset()}>
						<InputRow id="feeduri" label="Feed URI" type="text" help={<>This is going to look something like <code>at://did:plc:2sqok7oqqrhtmmmb5sulkrw2/app.bsky.feed.generator/aaaffrjyldgue</code>.</>} value={currentPreset?.feeduri} ref={feeduriRef} callback={() => updateCurrentPreset()} />
						<InputRow id="feedlimit" label="Feed Message Limit" type="number" value={currentPreset?.feedlimit} ref={feedlimitRef} callback={() => updateCurrentPreset()} />
						<InputRow id="feedx" label="Feed Position X" type="number" value={currentPreset?.feedx} ref={feedxRef} callback={() => updateCurrentPreset()} />
						<InputRow id="feedy" label="Feed Position Y" type="number" value={currentPreset?.feedy} ref={feedyRef} callback={() => updateCurrentPreset()} />
						<InputRow id="feedw" label="Feed Width" type="number" value={currentPreset?.feedw} ref={feedwRef} callback={() => updateCurrentPreset()} />
						<InputRow id="feedh" label="Feed Height" type="number" value={currentPreset?.feedh} ref={feedhRef} callback={() => updateCurrentPreset()} />
					</FormToggleSection>
					<FormToggleSection id="showFollowerAlerts" label="Show Follower Alerts?" groupName="followerAlerts" isOn={currentPreset?.showFollowerAlerts} ref={showFollowerAlertsRef} callback={() => updateCurrentPreset()}>
						<TextareaRow id="alerttext" label="Alert Text" ref={alerttextRef} callback={() => updateCurrentPreset()} help="{name} will be replaced with the follower's name." />
						<ListItemFormElements id="alertImages" label="Alert Images" ref={alertimagesRef} callback={() => updateCurrentPreset()} />
					</FormToggleSection>
					<RepeatableWidgets id="widgets" label="Custom Widgets (Experimental! Still Testing!)" data={currentPreset?.["widgets"]} callback={getWidgetInfo} ref={widgetsRef}></RepeatableWidgets>
				</FormSection>
				<FormSection title="Custom Formatting">
					<TextareaRow id="customtemplate" label="Custom Message Template" help="Use {author} to print the author handle and {message} to print the message. The whole thing will be wrapped in a &lt;li&gt; element that has &quot;even&quot; or &quot;odd&quot; applied to it, alternating." value={currentPreset?.customtemplate} ref={msgTemplateRef} callback={() => updateCurrentPreset()} />
					<TextareaRow id="customhtml" label="Custom HTML" help="Add any custom HTML you want here—e.g. if you want to display a hashtag, include a widget from somewhere, etc. Can include Javascript if you're spicy." value={currentPreset?.customhtml} ref={htmlRef} callback={() => updateCurrentPreset()} />
					<TextareaRow id="css" label="Custom CSS" help="Some minimal styles will be applied if nothing is entered." value={currentPreset?.css} ref={cssRef} callback={() => updateCurrentPreset()} />
				</FormSection>
				<div className="form-row">
					<button type="button" id="preset-update" onClick={() => savePreset()}>{presetRef.value !== "" ? "Update Preset" : "Add Preset"}</button> <button type="submit">Create Overlay</button>
				</div>
			</form>
		</main>
	)
}