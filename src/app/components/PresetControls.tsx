'use client';

import { useState, useRef } from 'react';

export default const PresetControls = () => {
	return (
		<div id="presetControls">
			<div>
				<label for="presets">Preset</label>
				<select name="presets" id="presets">
					<option value="">New...</option>
				</select>
			</div>
			<div>
				<label for="renamePreset">Preset Name</label>
				<input type="text" name="renamePreset" id="renamePreset" />
			</div>
		</div>
	);
};