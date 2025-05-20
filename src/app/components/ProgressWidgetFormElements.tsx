'use client';

import InputRow from './InputRow.tsx';
import SelectRow from './SelectRow.tsx';
import styles from '../page.module.css';
import { useRef, forwardRef } from 'react';

interface Props {
	id: string,
	children?: React.ReactNode,
	heading: string,
	type: string,
	foreground: string,
	background: string,
	current: number,
	maximum: number,
	prependUnits: string,
	appendUnits: string,
	posx: number,
	posy: number,
	width: number,
	height: number,
	uuid: string,
	index: number,
	style: string,
	callback: any
}

export default forwardRef<object[], Props>(function ProgressWidgetFormElements (props, ref) {
	const { id, type, heading, foreground, background, current, maximum, prependUnits, appendUnits, posx, posy, width, height, style, uuid, index, callback } = props;
	const idRef = useRef(id);
	const headingRef = useRef(heading)
	const posxRef = useRef(posx ?? 0);
	const posyRef = useRef(posy ?? 0);
	const widthRef = useRef(width ?? 200);
	const heightRef = useRef(height ?? 200);
	const fgRef = useRef(foreground ?? '#ffffff');
	const bgRef = useRef(background ?? '#000000');
	const prependUnitsRef = useRef(prependUnits ?? '');
	const appendUnitsRef = useRef(appendUnits ?? '');
	const currentRef = useRef(current ?? 0);
	const maximumRef = useRef(maximum ?? 100);
	const styleRef = useRef(type ?? 'circle');
	
	const removeWidget = () => {
		delete ref.current[uuid];
		callback();
	}
	
	const setWidgetInfo = () => {
		ref.current[uuid] = {
			id: idRef.current.value,
			posx: posxRef.current.valueAsNumber,
			posy: posyRef.current.valueAsNumber,
			width: widthRef.current.valueAsNumber,
			height: heightRef.current.valueAsNumber,
			foreground: fgRef.current.value,
			background: bgRef.current.value,
			appendUnits: appendUnitsRef.current.value,
			prependUnits: prependUnitsRef.current.value,
			current: currentRef.current.valueAsNumber,
			maximum: maximumRef.current.valueAsNumber,
			style: styleRef.current.value,
			type: 'progress',
		};
		callback();
	}
	
	return (
		<div className={styles.widgetRow}>
			<h4>
				Progress Widget
				<button type="button" onClick={removeWidget}>Remove</button>
			</h4>
			<InputRow type="hidden" id="widget_uuids" value={uuid} />
			<InputRow type="hidden" id={"widgets_"+uuid+"_type"} value="progress" />
			<InputRow type="text" id={"widgets_"+uuid+"_id"} label="Identifier" help="Should be all lowercase, with no spaces or punctuation." value={id} ref={idRef} callback={setWidgetInfo} />
			<InputRow type="text" id={"widgets_"+uuid+"_heading"} label="Heading" help="Displayed as a label. Leave blank to not display." value={heading} ref={headingRef} callback={setWidgetInfo} />
			<SelectRow id={"widgets_"+uuid+"_style"} label="Progress Bar Type" options={[{label: "Horizontal Bar", value: 'horizontal-bar'}, {label: "Vertical Bar", value: 'vertical-bar'}, {label: 'Circle', value: 'circle'}]} ref={styleRef} value={style} callback={setWidgetInfo} />
			<InputRow type="color" id={"widgets_"+uuid+"_foreground"} label="Foreground Color" value={foreground} ref={fgRef} callback={setWidgetInfo} />
			<InputRow type="color" id={"widgets_"+uuid+"_background"} label="Background Color" value={background} ref={bgRef} callback={setWidgetInfo} />
			<InputRow type="number" id={"widgets_"+uuid+"_current"} label="Current Value" value={current} ref={currentRef} callback={setWidgetInfo} />
			<InputRow type="number" id={"widgets_"+uuid+"_maximum"} label="Maximum Value" value={maximum} ref={maximumRef} callback={setWidgetInfo} />
			<InputRow type="text" id={"widgets_"+uuid+"_prependUnits"} label="Prepend Units" value={prependUnits} ref={prependUnitsRef} callback={setWidgetInfo} />
			<InputRow type="text" id={"widgets_"+uuid+"_appendUnits"} label="Append Units" value={appendUnits} ref={appendUnitsRef} callback={setWidgetInfo} />
			<InputRow type="number" id={"widgets_"+uuid+"_x"} label="Position X" value={posx} ref={posxRef} callback={setWidgetInfo} />
			<InputRow type="number" id={"widgets_"+uuid+"_y"} label="Position Y" value={posy} ref={posyRef} callback={setWidgetInfo} />
			<InputRow type="number" id={"widgets_"+uuid+"_w"} label="Width" value={width} ref={widthRef} callback={setWidgetInfo} />
			<InputRow type="number" id={"widgets_"+uuid+"_h"} label="Height" value={height} ref={heightRef} callback={setWidgetInfo} />
		</div>
	)
});