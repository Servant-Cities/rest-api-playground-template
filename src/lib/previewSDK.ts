import type { SavedPreviewSchema } from '$lib/schema';

let messageHandler: (event: MessageEvent) => void;

export const getRerouteURL = (url: string, pathsMap: Record<string, string>): string => {
	let rerouteURL = url;
	let urlPath: string;
	try {
		urlPath = new URL(url).pathname;
	} catch {
		urlPath = url.startsWith('/') ? url : '/' + url;
	}

	const matcher = Object.keys(pathsMap).find((pathToMatch) => {
		const routePattern = new RegExp('^' + pathToMatch.replace(/\*/g, '.*') + '$');
		return routePattern.test(urlPath);
	});

	if (matcher) {
		const newPath = pathsMap[matcher];
		if (newPath !== 'SKIP') {
			try {
				const parsedUrl = new URL(url);
				parsedUrl.pathname = newPath.replace(/\*/g, urlPath);
				rerouteURL = parsedUrl.toString();
			} catch {
				rerouteURL = url.replace(urlPath, newPath.replace(/\*/g, urlPath));
			}
		}
	}

	console.log(`Using override fetch to reroute ${url} to ${rerouteURL}`);
	return rerouteURL;
};

export interface Params {
	iFrameFetch: typeof fetch;
	preview: SavedPreviewSchema;
	secret: string;
}

export type FetchOverrideCreator = ({ iFrameFetch, preview, secret }: Params) => typeof fetch;

export const createFetchOverride: FetchOverrideCreator =
	({ iFrameFetch, preview, secret }) =>
	async (...args) => {
		let [firstArg, ...otherArgs] = [...args];
		const url = typeof firstArg === 'string' ? firstArg : firstArg.url;

		if (url) {
			const reroute = getRerouteURL(url, preview.pathsMap);
			const init = (typeof firstArg === 'string' ? otherArgs[0] : firstArg) || {};

			const modifiedInit = {
				...init,
				headers: {
					...init.headers,
					Authorization: `Bearer ${secret}`
				}
			};

			try {
				return fetch(reroute, typeof firstArg === 'string' ? modifiedInit : [firstArg, ...otherArgs]);
			} catch (err) {
				console.error(err);
			}
		}

		console.log(`Using iframe fetch for: ${url}`);
		return iFrameFetch(...args);
	};

export const createMessageHandler = (origin: string) =>
	(messageHandler = (event: MessageEvent) => {
		if (event.origin !== origin) return;
		if (event.data.type === 'REQUEST_PREVIEW_SDK') {
			const { preview } = event.data;
			const iFrameFetch = window.fetch;
			window.fetch = createFetchOverride({ iFrameFetch, preview });
		}
	});

export const accept = (origin: string) => {
	window.addEventListener('message', createMessageHandler(origin));
};

export const revoke = () => {
	window.addEventListener('message', messageHandler);
};