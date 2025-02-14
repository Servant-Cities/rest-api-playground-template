function getSecret() {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; secret=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

export default getSecret;
