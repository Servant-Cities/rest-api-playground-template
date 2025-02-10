import { masterDB } from '$lib/server/database';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
    const notice = await masterDB.getData('/application-settings/information-notice/value')
    return {
        notice
    };
};