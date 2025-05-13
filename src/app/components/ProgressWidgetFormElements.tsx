'use client';

import FormRow from './FormRow.tsx';

interface Props {
	id: string,
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
	height: number
}

export default function ProgressWidgetFormElements ({children, ...props}: {children: React.ReactNode, props: Props}) {
	const { id, type, foreground, background, current, maximum, prependUnits, appendUnits, posx, posy, width, height } = props;
	return (
		<div className="form-row">
			<h5>Progress Widget</h5>
			<FormRow type="text" id="identifier" label="Identifier" help="Should be all lowercase, with no spaces or punctuation." defaultValue={id} />
			<FormRow type="select" label="Progress Bar Type" id="type" options={[{label: "Horizontal Bar", value: 'horizontal-bar'}, {label: "Vertical Bar", value: 'vertical-bar'}, {label: 'Circle', value: 'circle'}]} />
			<FormRow type="color" id="foreground" label="Foreground Color" defaultValue={foreground} />
			<FormRow type="color" id="background" label="Background Color" defaultValue={background} />
			<FormRow type="number" id="current" label="Current Value" defaultValue={current} />
			<FormRow type="number" id="maximum" label="Maximum Value" defaultValue={maximum} />
			<FormRow type="text" id="prependUnits" label="Prepend Units" defaultValue={prependUnits} />
			<FormRow type="text" id="appendUnits" label="Append Units" defaultValue={appendUnits} />
			<FormRow type="number" id="posx" label="Position X" defaultValue={posx} />
			<FormRow type="number" id="posy" label="Position Y" defaultValue={posy} />
			<FormRow type="number" id="width" label="Width" defaultValue={width} />
			<FormRow type="number" id="height" label="Height" defaultValue={height} />
		</div>
	)
}