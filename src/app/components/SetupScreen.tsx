'use client';

import FormRow from './FormRow.tsx';
import PresetControls from './PresetControls.tsx';
import FormToggleSection from './FormToggleSection.tsx';
import FormSection from './FormSection.tsx';
import RepeatableWidgets from './RepeatableWidgets.tsx';
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
	const imagewRef = useRef(1920);
	const imagehRef = useRef(1080);
	const msgcountRef = useRef(5);
	const chatxRef = useRef(0);
	const chatyRef = useRef(0);
	const chatwRef = useRef('400px');
	const chathRef = useRef('600px');
	const showFollowerRef = useRef(null);
	const followerdisplayRef = useRef('handle');
	const followersizeRef = useRef('24px');
	const followerxRef = useRef(0);
	const followeryRef = useRef(0);
	const followerwRef = useRef('200px');
	const followerhRef = useRef('24px');
	const showFeedRef = useRef(false);
	const feeduriRef = useRef(true);
	const feedlimitRef = useRef(10);
	const feedxRef = useRef(0);
	const feedyRef = useRef(0);
	const feedwRef = useRef('400px');
	const feedhRef = useRef('600px');
	const showFollowerAlertsRef = useRef(false);
	const alerttextRef = useRef('');
	const htmlRef = useRef('');
	const msgTemplateRef = useRef('');
	const cssRef = useRef('');
	
	const loadPreset = (name) => {
		setCurrentPreset({...presets[name]});
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
		presetRef.current.value = presetKey;
		setPresets(newPresets);
	}
	
	const updateCurrentPreset = () => {
		setCurrentPreset({
			username: usernameRef.current.value,
			image: imageRef.current.value,
			textColor: colorRef.current.value,
			imagew: imagewRef.current.value ? parseInt(imagewRef.current.value) : 1920,
			imageh: imagehRef.current.value ? parseInt(imagehRef.current.value) : 1080,
			msgcount: msgcountRef.current.value ? parseInt(msgcountRef.current.value) : 5,
			chatx: chatxRef.current.value ? parseInt(chatxRef.current.value) : 0,
			chaty: chatyRef.current.value ? parseInt(chatyRef.current.value) : 0,
			chatw: chatwRef.current.value ? parseInt(chatwRef.current.value) : 400,
			chath: chathRef.current.value ? parseInt(chathRef.current.value) : 600,
			showFollower: showFollowerRef.current.checked ? true : false,
			followerdisplay: followerdisplayRef.current.value,
			followersize: followersizeRef.current.value,
			followerx: followerxRef.current.value,
			followery: followeryRef.current.value,
			followerw: followerwRef.current.value,
			followerh: followerhRef.current.value,
			showFeed: showFeedRef.current.checked ? true : false,
			feeduri: feeduriRef.current.value,
			feedlimit: feedlimitRef.current.value,
			feedx: feedxRef.current.value,
			feedy: feedyRef.current.value,
			feedw: feedwRef.current.value,
			feedh: feedhRef.current.value,
			showFollowerAlerts: showFollowerAlertsRef.current.value,
			alerttext: alerttextRef.current.value,
			css: cssRef.current.value,
			customhtml: htmlRef.current.value,
			customtemplate: msgTemplateRef.current.value
		});
	}
	
	useEffect(() => {
		if (presets === {} && localStorage.getItem('presets') || localStorage.getItem('presets') === "{}" && Object.keys(presets).length > 0) {
			localStorage.setItem('presets', JSON.stringify(presets));
			return;
		}
		localStorage.setItem('presets', JSON.stringify({}));
	}, [presets]);
	
	return (
    <main className={styles.main}>
			<h2>Overlay Setup</h2>
			<p>for stream.place | by <a href="https://bsky.app/profile/veryroundbird.house" target="_blank">veryroundbird.house</a> | <a href="https://ko-fi.com/veryroundbird" target="_blank">donate?</a></p>
			<div className={styles.presetControls}>
				<div>
					<label htmlFor="presets">Preset</label>
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
				<FormRow id="username" label="Username" type="text" ref={usernameRef} value={currentPreset?.username} callback={() => updateCurrentPreset()} />
				<FormRow id="image" label="Image Overlay" type="text" ref={imageRef} value={currentPreset?.image} callback={() => updateCurrentPreset()} />
				<FormRow id="color" label="Default Text Color" type="color" ref={colorRef} value={currentPreset?.textColor} callback={() => updateCurrentPreset()} />
				<FormRow id="imagew" label="Image Width" type="number" value={currentPreset?.imagew} ref={imagewRef} callback={() => updateCurrentPreset()} />
				<FormRow id="imageh" label="Image Height" type="number" value={currentPreset?.imageh} ref={imagehRef} callback={() => updateCurrentPreset()} />
				<FormRow id="msgcount" label="Message Count" type="number" value={currentPreset?.msgcount} ref={msgcountRef} callback={() => updateCurrentPreset()} />
				<FormRow id="chatx" label="Chatbox Position X" type="number" value={currentPreset?.chatx} ref={chatxRef} callback={() => updateCurrentPreset()} />
				<FormRow id="chaty" label="Chatbox Position Y" type="number" value={currentPreset?.chaty} ref={chatyRef} callback={() => updateCurrentPreset()} />
				<FormRow id="chatw" label="Chatbox Width" type="number" value={currentPreset?.chatw} ref={chatwRef} callback={() => updateCurrentPreset()} />
				<FormRow id="chath" label="Chatbox Height" type="number" value={currentPreset?.chath} ref={chathRef} callback={() => updateCurrentPreset()} />
				<FormSection title="Widgets">
					<FormToggleSection id="showFollower" label="Show Latest Follower?" groupName="followerControls" isOn={currentPreset?.showFollower} ref={showFollowerRef}>
						<FormRow id="followerdisplay" label="Follower Display Type" type="select" options={followerDisplayOptions} value={currentPreset?.followerdisplay} ref={followerdisplayRef} />
						<FormRow id="followersize" label="Follower Font Size" type="text" value={currentPreset?.followersize} ref={followersizeRef} />
						<FormRow id="followerx" label="Follower Position X" type="number" value={currentPreset?.followerx} ref={followerxRef} />
						<FormRow id="followery" label="Follower Position Y" type="number" value={currentPreset?.followery} ref={followeryRef} />
						<FormRow id="followerw" label="Follower Width" type="number" value={currentPreset?.followerw} ref={followerwRef} />
						<FormRow id="followerh" label="Follower Height" type="number" value={currentPreset?.followerh} ref={followerhRef} />
					</FormToggleSection>
					<FormToggleSection id="showFeed" label="Show Feed?" groupName="feedControls" isOn={currentPreset?.showFeed} ref={showFeedRef}>
						<FormRow id="feeduri" label="Feed URI" type="text" help={<>This is going to look something like <code>at://did:plc:2sqok7oqqrhtmmmb5sulkrw2/app.bsky.feed.generator/aaaffrjyldgue</code>.</>} value={currentPreset?.feeduri} ref={feeduriRef} />
						<FormRow id="feedlimit" label="Feed Message Limit" type="number" value={currentPreset?.feedlimit} ref={feedlimitRef} />
						<FormRow id="feedx" label="Feed Position X" type="number" value={currentPreset?.feedx} ref={feedxRef} />
						<FormRow id="feedy" label="Feed Position Y" type="number" value={currentPreset?.feedy} ref={feedyRef} />
						<FormRow id="feedw" label="Feed Width" type="number" value={currentPreset?.feedw} ref={feedwRef} />
						<FormRow id="feedh" label="Feed Height" type="number" value={currentPreset?.feedh} ref={feedhRef} />
					</FormToggleSection>
					<FormToggleSection id="showFollowerAlerts" label="Show Follower Alerts?" groupName="followerAlerts" isOn={currentPreset?.showFollowerAlerts} ref={showFollowerAlertsRef}>
						<FormRow id="alerttext" label="Alert Text" type="textarea" ref={alerttextRef} />
					</FormToggleSection>
					<RepeatableWidgets id="widgets" label="Widgets"></RepeatableWidgets>
				</FormSection>
				<FormSection title="Custom Formatting">
					<FormRow id="customtemplate" label="Custom Message Template" help="Use {author} to print the author handle and {message} to print the message. The whole thing will be wrapped in a &lt;li&gt; element that has &quot;even&quot; or &quot;odd&quot; applied to it, alternating." type="textarea" value={currentPreset?.customtemplate} ref={msgTemplateRef} />
					<FormRow id="customhtml" label="Custom HTML" help="Add any custom HTML you want here—e.g. if you want to display a hashtag, include a widget from somewhere, etc. Can include Javascript if you're spicy." type="textarea" value={currentPreset?.customhtml} ref={htmlRef} />
					<FormRow id="css" label="Custom CSS" help="Some minimal styles will be applied if nothing is entered." type="textarea" value={currentPreset?.css} ref={cssRef} />
				</FormSection>
				<div className="form-row">
					<button type="button" id="preset-update" onClick={() => savePreset()}>{presetRef.value !== "" ? "Update Preset" : "Add Preset"}</button> <button type="submit">Create Overlay</button>
				</div>
			</form>
		</main>
	)
}