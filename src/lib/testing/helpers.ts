export const getDefaultStyles = ():
	| { fontSize: number; spacing: number; lineHeight: number }
	| undefined => {
	const computedStyle = window.getComputedStyle(document.documentElement);

	// Get the root font size (default is usually 16px)
	const fontSize = parseFloat(computedStyle.fontSize);

	// Get the default letter spacing (default is usually 0px, converted to multiplier)
	const spacing = parseFloat(computedStyle.letterSpacing) || 0;

	// Get the default line height (default is usually 1.5, converted to multiplier)
	const lineHeight = parseFloat(computedStyle.lineHeight) || 1.5;

	return { fontSize, spacing, lineHeight };
};

export const addCSSClass = (className: string, css: string) => {
	const body = document.body || document.querySelector('body');

	if (body.classList.contains(className)) {
		console.info(`Class ${className} already exists`);
		return;
	}

	const sheet = document.createElement('style');
	sheet.appendChild(
		document.createTextNode(`
        .${className} {
            ${css}
        }    
    `)
	);
	body.appendChild(sheet);
};

export const addCSS = (css: string) => {
	const body = document.body || document.querySelector('body');

	if (body.classList.contains(css)) {
		console.info(`Class ${css} already exists`);
		return;
	}

	const sheet = document.createElement('style');
	sheet.appendChild(document.createTextNode(css));
	body.appendChild(sheet);
};
