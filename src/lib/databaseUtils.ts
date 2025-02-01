import { invalidateAll } from '$app/navigation';

const fetchAndInvalidate = async (...fetchParams: Parameters<typeof fetch>) =>
	fetch(...fetchParams).then(async(res) => {
		await invalidateAll();
		return res
	});

export const getDatabaseProperty = async (path: string) => {
	return fetch(`/api/direct/${path}`);
};

export const addDatabaseProperty = async (path: string, payload: any) => {
	return fetchAndInvalidate(`/api/direct/${path}`, {
		method: 'POST',
		body: JSON.stringify({ payload })
	});
};

export const updateDatabaseProperty = async (path: string, payload: any) => {
	return fetchAndInvalidate(`/api/direct/${path}`, {
		method: 'PUT',
		body: JSON.stringify({ payload })
	});
};

export const deleteDatabaseProperty = async (path: string) => {
	return fetchAndInvalidate(`/api/direct/${path}`, { method: 'DELETE' });
};
