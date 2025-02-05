export async function authorizedFetch(url: string, options: RequestInit = {}): Promise<Response> {
	const secret = document.cookie
		.split('; ')
		.find(row => row.startsWith('secret='))
		?.split('=')[1];

	if (!secret) {
		throw new Error('Authorization secret is missing');
	}

	const headers = new Headers(options.headers || {});
	headers.set('Authorization', `Bearer ${decodeURIComponent(secret)}`);

	return fetch(url, { ...options, headers });
}
