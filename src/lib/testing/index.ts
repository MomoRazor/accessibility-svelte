import { getDefaultStyles, addCSSClass, addCSS } from './helpers.js';

export type Accessibility = ReturnType<typeof createAccessibility>;

export const createAccessibility = () => {
	const defaults = getDefaultStyles();

	if (!defaults) {
		throw new Error('Default styles could not be retrieved.');
	}

	// Initialize state with defaults or user-provided options
	let textSize = defaults.fontSize;
	let textSpacing = defaults.spacing;
	let lineHeightValue = defaults.lineHeight;
	let invertColors = false;

	return {
		state: {
			textSize,
			textSpacing,
			lineHeightValue,
			invertColors
		},
		// Adjust text size
		alterTextSize(size: number): void {
			textSize = size;
			console.log(`Text size set to ${textSize}px`);
		},

		// Adjust text spacing
		alterTextSpacing(spacing: number): void {
			textSpacing = spacing;
			console.log(`Text spacing set to ${textSpacing}`);
		},

		// Adjust line height
		alterLineHeight(height: number): void {
			lineHeightValue = height;
			console.log(`Line height set to ${lineHeightValue}`);
		},

		// Toggle color inversion
		toggleInvertColors(): void {
			invertColors = !invertColors;
			console.log(`Color inversion ${invertColors ? 'enabled' : 'disabled'}`);
		},

		// Text-to-speech functionality
		textToSpeech(text: string): void {
			if ('speechSynthesis' in window) {
				const utterance = new SpeechSynthesisUtterance(text);
				window.speechSynthesis.speak(utterance);
				console.log('Text-to-speech started');
			} else {
				console.error('Text-to-speech is not supported in this browser.');
			}
		},

		// Speech-to-text functionality
		speechToText(callback: (transcript: string) => void): void {
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
		},

		// Action State to document
		confirmState(): void {
			addCSSClass(
				'invert-colors',
				`
					filter: invert(1) hue-rotate(180deg);
				`
			);

			addCSS(`
				* {
					background-color: #ffffff;
				}	
			`);

			document.documentElement.style.fontSize = `${textSize}px`;
			document.documentElement.style.letterSpacing = `${textSpacing}px`;
			document.documentElement.style.lineHeight = `${lineHeightValue}`;
			if (invertColors) {
				document.documentElement.classList.add('invert-colors');
			} else {
				document.documentElement.classList.remove('invert-colors');
			}
		},

		resetState(): void {
			textSize = defaults.fontSize;
			textSpacing = defaults.spacing;
			lineHeightValue = defaults.lineHeight;
			invertColors = false;

			document.documentElement.style.fontSize = `${textSize}px`;
			document.documentElement.style.letterSpacing = `${textSpacing}px`;
			document.documentElement.style.lineHeight = `${lineHeightValue}`;
			document.documentElement.classList.remove('invert-colors');

			console.log('Accessibility settings reset to default');
		}
	};
};
