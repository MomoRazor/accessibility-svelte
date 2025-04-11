<script lang="ts">
	import { createAccessibility, type Accessibility } from '$lib/testing/index.js';
	import { onMount } from 'svelte';
	let accessibility: Accessibility | null = null;

	onMount(() => {
		accessibility = createAccessibility();
	});

	const enlarge = () => {
		if (!accessibility) {
			console.error('Accessibility instance is not initialized');
			return;
		}
		try {
			accessibility.alterTextSize(20);
			accessibility.confirmState();
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
			accessibility.confirmState();
		} catch (error) {
			console.error('Error creating accessibility instance:', error);
		}
	};
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<button onclick={enlarge}>Enlarge</button>
<button onclick={toggleInvert}>Invert</button>
