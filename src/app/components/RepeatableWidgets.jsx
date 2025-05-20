'use client';

import ProgressWidgetFormElements from './ProgressWidgetFormElements';
import ListWidgetFormElements from './ListWidgetFormElements';
import TimerWidgetFormElements from './TimerWidgetFormElements';
import styles from '../page.module.css';
import { useState, useEffect, useRef, forwardRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default forwardRef(function RepeatableWidgets(props, ref) {
	const { id, children, label, data, isOn, callback } = props;
	const typeRef = useRef('progress');
	
	const addWidget = () => {
		if (!ref.current) ref.current = {};
		const newWidget = {id: 'widget-'+(Object.keys(ref.current).length+1), type: typeRef.current.value, posx: 0, posy: 0, width: 200, height: 200};
		if (typeRef.current.value === 'progress') newWidget['style'] = 'circle-bar';
		if (typeRef.current.value === 'list') newWidget['items'] = [];
		if (typeRef.current.value === 'timer') {
			newWidget['defaultTime'] = '10:00';
			newWidget['maximum'] = 100;
			newWidget['current'] = 0;
		}
		ref.current[uuidv4()] = newWidget;
		callback(id, ref.current);
	}
	
	const removeWidget = (uuid) => {
		delete ref.current[uuid];
		callback(id, ref.current);
	}
	
	return (
		<details open={isOn}>
			<summary><h3>{label}</h3></summary>
			<div className="form-row">
				<label htmlFor="widgetType">Widget Type</label>
				<select name="widgetType" id="widgetType" ref={typeRef}>
					<option key="progress" value="progress">Progress Bar</option>
					<option key="list" value="list">List</option>
					<option key="timer" value="timer">Timer</option>
				</select>
				<button type="button" id="add-widget" onClick={addWidget}>Add Widget</button>
				<div id={id} className={styles[id]}>
					{ref.current ? Object.keys(ref.current).map((key, i) => {
						const widget = ref.current[key];
						if (widget.type === "progress") {
							return(
								<ProgressWidgetFormElements uuid={key} id={widget.id} index={i} type={widget.type} key={i} current={widget.current} maximum={widget.maximum} foreground={widget.foreground} prependUnits={widget.prependUnits} appendUnits={widget.appendUnits} background={widget.background} posx={widget.posx} posy={widget.posy} width={widget.width} height={widget.height} css={widget.css} ref={ref} callback={() => callback(id, ref.current)} />
							)
						} else if (widget.type === "list") {
							return (
								<ListWidgetFormElements uuid={key} id={widget.id} key={i} index={i} heading={widget.heading} items={widget.items} posx={widget.posx} posy={widget.posy} width={widget.width} height={widget.height} color={widget.color} ref={ref} callback={() => callback(id, ref.current)} />
							)
						} else if (widget.type === "timer") {
							return (
								<TimerWidgetFormElements uuid={key} id={widget.id} index={i} key={i} posx={widget.posx} posy={widget.posy} width={widget.width} height={widget.height} foreground={widget.foreground} background={widget.background} defaultTime={widget.defaultTime} ref={ref} callback={() => callback(id, ref.current)} />
							)
						}
						return null;
					}) : ''}
				</div>
			</div>
		</details>
	)
});