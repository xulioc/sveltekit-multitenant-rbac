import { getEvents } from '$lib/server/tracking';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const ret = await getEvents(event);
	return { events: ret.events };
};
