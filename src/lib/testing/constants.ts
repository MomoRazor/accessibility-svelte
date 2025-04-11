export const class_prefix = 'accessibility-';
export const local_storage_prefix = 'accessibility-';

export type LocalCSSClass = 'invert-colors' | 'grey-scale';

export type AddedClass = `${typeof class_prefix}${LocalCSSClass}`;

export type AccessibilityState = {
	// Font size in pixels
	fontSize?: number;
	// Letter spacing in pixels
	textSpacing?: number;
	// Line height as a multiplier
	lineHeight?: number;
	// Color filter applied
	color?: 'invert' | 'grey';
};
