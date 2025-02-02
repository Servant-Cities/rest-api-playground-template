const matchesRoute = (url: string, paths: Array<string>): boolean => {
    console.log(url);

    let urlPath: string;
    try {
        urlPath = new URL(url).pathname;
    } catch {
        urlPath = url.startsWith('/') ? url : '/' + url;
    }

    return paths.some(route => {
        const routePattern = new RegExp(
            '^' + route.replace(/\*/g, '.*') + '$'
        );
        return routePattern.test(urlPath);
    });
};

export interface Params {
    iFrameFetch: typeof fetch;
    paths: Array<string>;
}

type FetchOverrideCreator = ({ iFrameFetch, paths }: Params) => typeof fetch;

const createFetchOverride: FetchOverrideCreator =
    ({ iFrameFetch, paths }) =>
    async (...args) => {
        const url = typeof args[0] === 'string' ? args[0] : args[0].url;

        if (url && matchesRoute(url, paths)) {
            console.log(`Using override fetch for: ${url}`);
            try {
                return fetch(...args);
            } catch (err) {
                console.error(err);
            }
        }

        console.log(`Using iFrameFetch for: ${url}`);
        return iFrameFetch(...args);
    };

export default createFetchOverride;
