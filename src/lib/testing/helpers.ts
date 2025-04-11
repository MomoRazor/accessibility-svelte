import {
	class_prefix,
	local_storage_prefix,
	type AccessibilityState,
	type LocalCSSClass
} from './constants.js';

export const Utilities = () => {
	const getDefaultStyles = (
		ref: Document
	): { fontSize?: number; spacing?: number; lineHeight?: number } | undefined => {
		if (!window) {
			throw new Error('Window is not defined');
		}

		if (!ref.documentElement) {
			throw new Error('Document element is not defined');
		}

		const computedStyle = window.getComputedStyle(ref.documentElement);

		// Get the root font size (default is usually 16px)
		const fontSize = computedStyle.fontSize ? parseFloat(computedStyle.fontSize) : undefined;

		// Get the default letter spacing (default is usually 0px, converted to multiplier)
		const spacing = computedStyle.letterSpacing
			? parseFloat(computedStyle.letterSpacing)
			: undefined;

		// Get the default line height (default is usually 1.5, converted to multiplier)
		const lineHeight = computedStyle.lineHeight ? parseFloat(computedStyle.lineHeight) : undefined;

		return { fontSize, spacing, lineHeight };
	};

	const getListOfCSSClasses = (ref: Document) => {
		if (!ref.documentElement) {
			throw new Error('Document element is not defined');
		}
		const allCSSClasses: string[] = [];
		const sheets = Array.from(ref.styleSheets);
		const rules = sheets.map((sheet) => Array.from(sheet.cssRules)).flat();

		for (const rule of rules) {
			const name = rule.cssText.slice(0, rule.cssText.indexOf('{')).trim();

			if (name[0] === '.') {
				allCSSClasses.push(name.slice(1, name.length).trim());
			}
		}

		return allCSSClasses;
	};

	const defineCSSClasses = (
		ref: Document,
		classes: {
			className: LocalCSSClass;
			css: string;
		}[]
	) => {
		const head = ref.head || ref.querySelector('head');

		if (!head) {
			throw new Error('Head is not defined');
		}

		const sheet = ref.createElement('style');

		for (let i = 0; i < classes.length; i++) {
			const finalClassName = `${class_prefix}${classes[i].className}`;

			const cssClasses = getListOfCSSClasses(ref);

			if (cssClasses.includes(finalClassName)) {
				console.info(`Class ${finalClassName} already exists`);
				return;
			}
			sheet.appendChild(
				ref.createTextNode(`
			.${finalClassName} {
				${classes[i].css}
			}    
		`)
			);
		}

		head.appendChild(sheet);
	};

	const toggleCSSClassOnDocument = (className: LocalCSSClass, value: boolean, ref: Document) => {
		if (!ref.documentElement) {
			throw new Error('Document not found');
		}

		const finalClassName = `${class_prefix}${className}`;

		if (value === true) {
			ref.documentElement.classList.add(finalClassName);
			return;
		} else {
			ref.documentElement.classList.remove(finalClassName);
			return;
		}
	};

	const saveStateToLocalStorage = (state: AccessibilityState) => {
		if (!window) {
			throw new Error('Window is not defined');
		}

		window.localStorage.setItem(`${local_storage_prefix}-state`, JSON.stringify(state));
	};

	const getStateFromLocalStorage = (): AccessibilityState | null => {
		if (!window) {
			throw new Error('Window is not defined');
		}

		const state = window.localStorage.getItem(`${local_storage_prefix}-state`);

		if (state) {
			return JSON.parse(state);
		}

		return null;
	};

	return {
		getDefaultStyles,
		getListOfCSSClasses,
		defineCSSClasses,
		toggleCSSClassOnDocument,
		saveStateToLocalStorage,
		getStateFromLocalStorage
	};
};
