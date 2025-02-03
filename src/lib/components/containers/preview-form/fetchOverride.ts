import type { SavedPreviewSchema } from '$lib/schema';

const getRerouteURL = (url: string, pathsMap: Record<string, string>): string => {
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
}

type FetchOverrideCreator = ({ iFrameFetch, preview }: Params) => typeof fetch;

const createFetchOverride: FetchOverrideCreator =
	({ iFrameFetch, preview }) =>
	async (...args) => {
		let [firstArg, ...otherArgs] = [...args];
		const url = typeof firstArg === 'string' ? firstArg : firstArg.url;

		if (url) {
			const reroute = getRerouteURL(url, preview.pathsMap);
			try {
				return fetch(reroute, ...otherArgs);
			} catch (err) {
				console.error(err);
			}
		}

		console.log(`Using iframe fetch for: ${url}`);
		return iFrameFetch(...args);
	};

export default createFetchOverride;
