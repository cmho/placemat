'use client';

import InputRow from './InputRow.tsx';
import styles from '../page.module.css';
import { useRef, forwardRef } from 'react';

interface Props {
	id: string,
	heading: string,
	children: React.ReactNode,
	posx: number,
	posy: number,
	width: number,
	height: number,
	defaultTime: string,
	foreground: string,
	background: string,
	uuid: string,
	callback: any
}

export default forwardRef<object[], Props>(function TimerWidgetFormElements (props, ref) {
	const { id, heading, children, posx, posy, width, height, defaultTime, foreground, background, uuid, callback } = props;
	const idRef = useRef(id ?? 'New Widget '+index);
	const headingRef = useRef(heading ?? '');
	const posxRef = useRef(posx ?? 0);
	const posyRef = useRef(posy ?? 0);
	const widthRef = useRef(width ?? 200);
	const heightRef = useRef(height ?? 200);
	const timeRef = useRef(defaultTime ?? '10:00');
	const fgRef = useRef(foreground ?? '#000000');
	const bgRef = useRef(background ?? '#FFFFFF');
	
	const removeWidget = () => {
		delete ref.current[uuid];
		callback();
	}
	
	const setWidgetInfo = () => {
		ref.current[uuid] = {
			id: idRef.current.value,
			heading: headingRef.current.value,
			posx: posxRef.current.valueAsNumber,
			posy: posyRef.current.valueAsNumber,
			width: widthRef.current.valueAsNumber,
			height: heightRef.current.valueAsNumber,
			defaultTime: timeRef.current.value,
			foreground: fgRef.current.value,
			background: bgRef.current.value,
			type: 'timer'
		};
		callback();
	}
	
	return (
		<div className={styles.widgetRow}>
			<h4>
				Timer Widget
				<button type="button" onClick={removeWidget}>Remove</button>
			</h4>
			<InputRow id="widget_uuids" type="hidden" value={uuid} />
			<InputRow id={'widgets_'+uuid+'_type'} type="hidden" value="timer" />
			<InputRow id={'widgets_'+uuid+'_id'} value={id} type="text" label="Identifier" help="Should be all lowercase, with no spaces or punctuation." ref={idRef} callback={setWidgetInfo} />
			<InputRow id={'widgets_'+uuid+'_heading'} value={heading} type="text" label="Heading" help="Displayed as a label. Leave blank to not display." ref={headingRef} callback={setWidgetInfo} />
			<InputRow id={'widgets_'+uuid+'_x'} value={posx} type="number" label="Position X" ref={posxRef} callback={setWidgetInfo} />
			<InputRow id={'widgets_'+uuid+'_y'} value={posy} type="number" label="Position Y" ref={posyRef} callback={setWidgetInfo} />
			<InputRow id={'widgets_'+uuid+'_w'} value={width} type="number" label="Width" ref={widthRef} callback={setWidgetInfo} />
			<InputRow id={'widgets_'+uuid+'_h'} value={height} type="number" label="Height" ref={heightRef} callback={setWidgetInfo} />
			<InputRow type="color" id={'widgets_'+uuid+'_foreground'} label="Foreground Color" value={foreground} ref={fgRef} callback={setWidgetInfo} />
			<InputRow type="color" id={'widgets_'+uuid+'_background'} label="Background Color" value={background} ref={bgRef} callback={setWidgetInfo} />
			<InputRow id={'widgets_'+uuid+'_defaultTime'} type="text" label="Default Time" value={defaultTime} ref={timeRef} callback={setWidgetInfo} />
			{children}
		</div>
	);
});