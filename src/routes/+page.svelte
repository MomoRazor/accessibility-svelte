<script lang="ts">
	import { createAccessibility, type Accessibility } from '$lib/testing/index.js';
	import { onMount } from 'svelte';
	let accessibility: Accessibility | null = null;

	onMount(() => {
		accessibility = createAccessibility();
	});

	const reset = () => {
		if (!accessibility) {
			console.error('Accessibility instance is not initialized');
			return;
		}
		try {
			accessibility.resetState();
		} catch (error) {
			console.error('Error creating accessibility instance:', error);
		}
	};

	const enlargeFontSize = () => {
		if (!accessibility) {
			console.error('Accessibility instance is not initialized');
			return;
		}
		try {
			accessibility.alterTextSize(20);
			accessibility.runState();
		} catch (error) {
			console.error('Error creating accessibility instance:', error);
		}
	};

	const minimizeFontSize = () => {
		if (!accessibility) {
			console.error('Accessibility instance is not initialized');
			return;
		}
		try {
			accessibility.alterTextSize(5);
			accessibility.runState();
		} catch (error) {
			console.error('Error creating accessibility instance:', error);
		}
	};

	const enlargeLineHeight = () => {
		if (!accessibility) {
			console.error('Accessibility instance is not initialized');
			return;
		}
		try {
			accessibility.alterLineHeight(20);
			accessibility.runState();
		} catch (error) {
			console.error('Error creating accessibility instance:', error);
		}
	};

	const minimizeLineHeight = () => {
		if (!accessibility) {
			console.error('Accessibility instance is not initialized');
			return;
		}
		try {
			accessibility.alterLineHeight(5);
			accessibility.runState();
		} catch (error) {
			console.error('Error creating accessibility instance:', error);
		}
	};

	const toggleInvert = () => {
		if (!accessibility) {
			console.error('Accessibility instance is not initialized');
			return;
		}
		try {
			accessibility.toggleInvertColors();
			accessibility.runState();
		} catch (error) {
			console.error('Error creating accessibility instance:', error);
		}
	};

	const toggleGrey = () => {
		if (!accessibility) {
			console.error('Accessibility instance is not initialized');
			return;
		}
		try {
			accessibility.toggleColorGreyScale();
			accessibility.runState();
		} catch (error) {
			console.error('Error creating accessibility instance:', error);
		}
	};

	const textToSpeech = () => {
		if (!accessibility) {
			console.error('Accessibility instance is not initialized');
			return;
		}
		try {
			accessibility.textToSpeech('Hello, this is a test of the text to speech functionality.');
			accessibility.runState();
		} catch (error) {
			console.error('Error creating accessibility instance:', error);
		}
	};
</script>

<div>
	<h1>Welcome to your library project</h1>
	<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
	<p>
		Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
	</p>

	<button onclick={reset}>Reset</button>
	<p>Font Size:</p>
	<button onclick={enlargeFontSize}>Enlarge</button>
	<button onclick={minimizeFontSize}>Minimize</button>
	<p>Line Height:</p>
	<button onclick={enlargeLineHeight}>Enlarge</button>
	<button onclick={minimizeLineHeight}>Minimize</button>
	<p>Colours:</p>
	<button onclick={toggleInvert}>Invert</button>
	<button onclick={toggleGrey}>grey</button>
	<p>Text to Speech:</p>
	<button onclick={textToSpeech}>Speak</button>
</div>

<style>
	p {
		color: white;
	}
	div {
		background-color: darkgreen;
	}
</style>
