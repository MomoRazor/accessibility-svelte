import type { AccessibilityState } from './constants.js';
import { Utilities } from './helpers.js';

export type Accessibility = ReturnType<typeof createAccessibility>;

export const createAccessibility = (ref?: Document) => {
	const target = ref || document;

	if (!target) {
		throw new Error('Document not found');
	}

	const utilities = Utilities();
	const defaults = utilities.getDefaultStyles(target);

	utilities.defineCSSClasses(target, [
		{
			className: 'invert-colors',
			css: 'filter: invert(1) hue-rotate(180deg); background-color: #ffffff;'
		},
		{
			className: 'grey-scale',
			css: 'filter: grayscale(1);'
		}
	]);

	if (!defaults) {
		throw new Error('Default styles could not be retrieved.');
	}

	const savedState = utilities.getStateFromLocalStorage();

	// Initialize state with defaults or user-provided options
	const status: AccessibilityState = savedState || {
		fontSize: defaults.fontSize,
		textSpacing: defaults.spacing,
		lineHeight: defaults.lineHeight,
		color: undefined
	};

	// Action State to document
	const runState = (): void => {
		if (!target.documentElement) {
			throw new Error('Document not found');
		}

		if (status.fontSize) {
			target.documentElement.style.fontSize = `${status.fontSize}px`;
		} else {
			target.documentElement.style.fontSize = 'initial';
		}

		if (status.textSpacing) {
			target.documentElement.style.letterSpacing = `${status.textSpacing}px`;
		} else {
			target.documentElement.style.letterSpacing = 'initial';
		}

		if (status.lineHeight) {
			target.documentElement.style.lineHeight = `${status.lineHeight}`;
		} else {
			target.documentElement.style.lineHeight = 'initial';
		}

		if (status.color === 'invert') {
			utilities.toggleCSSClassOnDocument('invert-colors', true, target);
			utilities.toggleCSSClassOnDocument('grey-scale', false, target);
		} else if (status.color === 'grey') {
			utilities.toggleCSSClassOnDocument('grey-scale', true, target);
			utilities.toggleCSSClassOnDocument('invert-colors', false, target);
		} else {
			utilities.toggleCSSClassOnDocument('invert-colors', false, target);
			utilities.toggleCSSClassOnDocument('grey-scale', false, target);
		}

		utilities.saveStateToLocalStorage(status);
	};

	runState();

	// Adjust text size
	const alterTextSize = (size: number): void => {
		status.fontSize = size;
		console.log(`Text size set to ${status.fontSize}px`);
	};

	// Adjust text spacing
	const alterTextSpacing = (spacing: number): void => {
		status.textSpacing = spacing;
		console.log(`Text spacing set to ${status.textSpacing}`);
	};

	// Adjust line height
	const alterLineHeight = (height: number): void => {
		status.lineHeight = height;
		console.log(`Line height set to ${status.lineHeight}`);
	};

	// Toggle color inversion
	const toggleInvertColors = (): void => {
		if (status.color !== 'invert') {
			status.color = 'invert';
		} else {
			status.color = undefined;
		}
		console.log(`Color switched to ${status.color}`);
	};

	const toggleColorGreyScale = (): void => {
		if (status.color !== 'grey') {
			status.color = 'grey';
		} else {
			status.color = undefined;
		}
		console.log(`Color switched to ${status.color}`);
	};

	// Text-to-speech functionality
	const textToSpeech = (text: string): void => {
		if ('speechSynthesis' in window) {
			const utterance = new SpeechSynthesisUtterance(text);
			window.speechSynthesis.speak(utterance);
			console.log('Text-to-speech started');
		} else {
			console.error('Text-to-speech is not supported in this browser.');
		}
	};

	// Speech-to-text functionality
	const speechToText = (callback: (transcript: string) => void): void => {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		if (SpeechRecognition) {
			const recognition = new SpeechRecognition();
			recognition.onresult = (event) => {
				const transcript = event.results[0][0].transcript;
				callback(transcript);
				console.log('Speech-to-text result:', transcript);
			};
			recognition.start();
			console.log('Speech-to-text started');
		} else {
			console.error('Speech-to-text is not supported in this browser.');
		}
	};

	// Apply default styles
	const resetState = (): void => {
		status.fontSize = defaults.fontSize;
		status.textSpacing = defaults.spacing;
		status.lineHeight = defaults.lineHeight;
		status.color = undefined;

		runState();

		console.log('Accessibility settings reset to default');
	};

	return {
		status,
		alterTextSize,
		alterTextSpacing,
		alterLineHeight,
		toggleColorGreyScale,
		toggleInvertColors,
		textToSpeech,
		speechToText,
		runState,
		resetState
	};
};
