'use client';

import InputRow from './InputRow.tsx';
import ListItemFormElements from './ListItemFormElements.tsx';
import styles from '../page.module.css';
import { useEffect, useRef, forwardRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Props {
	id: string,
	uuid: string,
	heading: string,
	color: string,
	children: React.ReactNode,
	width: number,
	height: number,
	posx: number,
	posy: number,
	index: number,
	items: string[], 
	callback?: any
}

export default forwardRef<object, Props>(function ListWidgetFormElements (props, ref) {
	const { id, uuid, heading, children, color, width, height, posx, posy, items, index, callback } = props;
	const idRef = useRef(id ?? "widget-"+(index));
	const headingRef = useRef(heading ?? "");
	const colorRef = useRef(color ?? "#000000");
	const posxRef = useRef(posx ?? 0);
	const posyRef = useRef(posy ?? 0);
	const widthRef = useRef(width ?? 200);
	const heightRef = useRef(height ?? 200);
	
	const removeWidget = () => {
		delete ref.current[uuid];
		callback();
	}
	
	const addItem = () => {
		ref.current[uuid].items.push("");
		callback();
	}
	
	const removeItem = (i) => {
		ref.current[uuid].items.splice(i, 1);
		callback();
	}
	
	const updateItem = (i, value) => {
		ref.current[uuid].items[i] = value;
		callback();
	}
	
	const setWidgetInfo = () => {
		const items = ref.current[uuid].items ?? [];
		ref.current[uuid] = {
			id: idRef.current.value,
			heading: headingRef.current.value,
			color: colorRef.current.value,
			posx: posxRef.current.valueAsNumber,
			posy: posyRef.current.valueAsNumber,
			width: widthRef.current.valueAsNumber,
			height: heightRef.current.valueAsNumber,
			items: items,
			type: 'list'
		};
		callback();
	}
	
	return (<div className={styles.widgetRow}>
		<h4>
			List Widget
			<button type="button" onClick={removeWidget}>Remove</button>
		</h4>
		<InputRow id="widget_uuids" value={uuid} type="hidden" />
		<InputRow id={"widgets_"+uuid+"_type"} value="list" type="hidden" />
		<InputRow id={'widgets_'+uuid+'_id'} value={id} type="text" label="Identifier" help="Should be unique and all lowercase, with no spaces or punctuation; used to provide a CSS ID for styling." ref={idRef} callback={setWidgetInfo} />
		<InputRow id={'widgets_'+uuid+'_heading'} value={heading} type="text" label="Heading" help="Displayed as the list header. Leave blank to not display." ref={headingRef} callback={setWidgetInfo} />
		<InputRow id={'widgets_'+uuid+'_foreground'} value={color} type="color" label="Text Color" ref={colorRef} callback={setWidgetInfo} />
		<InputRow id={'widgets_'+uuid+'_x'} value={posx} type="number" label="Position X" ref={posxRef} callback={setWidgetInfo} />
		<InputRow id={'widgets_'+uuid+'_y'} value={posy} type="number" label="Position Y" ref={posyRef} callback={setWidgetInfo} />
		<InputRow id={'widgets_'+uuid+'_w'} value={width} type="number" label="Width" ref={widthRef} callback={setWidgetInfo} />
		<InputRow id={'widgets_'+uuid+'_h'} value={height} type="number" label="Height" ref={heightRef} callback={setWidgetInfo} />
		<p className={styles.buttonRow}><b>Initial List Items</b> <button type="button" onClick={addItem}>Add</button></p>
		<ul className={styles.listItemsList}>
		{ref.current[uuid]['items'].length > 0 ? ref.current[uuid].items.map((item, i) => {
			return (
				<li key={i}>
					<input type="text" defaultValue={item} name={'widgets_'+uuid+'_items'} onChange={(e) => updateItem(i, e.target.value)} /> <button type="button" onClick={() => removeItem(i)}>Remove</button>
				</li>
			)
		}) : ''}
		</ul>
	</div>)
});