'use client';

import ProgressWidgetFormElements from './ProgressWidgetFormElements.tsx';
import ListWidgetFormElements from './ListWidgetFormElements.tsx';
import TimerWidgetFormElements from './TimerWidgetFormElements.tsx';
import { useState, useRef } from 'react';

type Widget = {
	type: string,
	posx: number,
	posy: number,
	width: number,
	height: number,
	items?: any[],
	current?: number,
	max?: number,
	foreground?: string,
	background?: string,
	css?: string
}

interface Props {
	id: string,
	label: string,
	isOn: boolean
}

export default function RepeatableWidgets({children, ...props}: {children: React.ReactNode, props: Props}) {
	const { id, label, isOn } = props;
	const [widgets, setWidgets] = useState([]);
	const typeRef = useRef('circle-bar');
	
	const addWidget = () => {
		setWidgets([...widgets, {type: typeRef.current.value, posx: 0, posy: 0, width: '200px', height: '200px'}]);
	}
	
	return (
		<details open={isOn}>
			<summary><h4>{label}</h4></summary>
			<div className="form-row">
				<label htmlFor="widgetType">Widget Type</label>
				<select name="widgetType" id="widgetType" ref={typeRef}>
					<option key="progress" value="progress">Progress Bar</option>
					<option key="list" value="list">List</option>
					<option key="timer" value="timer">Timer</option>
				</select>
				<button type="button" id="add-widget" onClick={addWidget}>Add Widget</button>
				<div id={id}>
					{widgets.map((widget, i) => {
						console.log(widget);
						if (widget.type === "progress") {
							return(
								<ProgressWidgetFormElements id={widget.id} type={widget.type} key={i} current={widget.current} max={widget.max} foreground={widget.foreground} background={widget.background} posx={widget.posx} posy={widget.posy} width={widget.width} height={widget.height} css={widget.css} />
							)
						} else if (widget.type === "list") {
							return (
								<ListWidgetFormElements id={widget.id} key={i} items={widget.items} posx={widget.posx} posy={widget.posy} width={widget.width} height={widget.height} css={widget.css} />
							)
						} else if (widget.type === "timer") {
							return (
								<TimerWidgetFormElements id={widget.id} key={i} posx={widget.posx} posy={widget.posy} width={widget.width} height={widget.height} css={widget.css} />
							)
						}
						return null;
					})}
				</div>
			</div>
		</details>
	)
}