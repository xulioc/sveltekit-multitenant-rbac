import { desc } from 'drizzle-orm';
import { db } from './db';
import { tracking } from './schemas';

export const getEvents = async (event) => {
	try {
		const events = await db.query.tracking.findMany({
			columns: {
				groupId: false
			},
			where: (ev, { eq }) => eq(ev.groupId, event.locals.group),
			with: {
				createdBy: { columns: { email: true } }
			},
			orderBy: [desc(tracking.createdAt)]
		});
		// console.log(events)
		return { events };
	} catch (e) {
		throw new Error((e as Error).message);
	}
};

export const trackEvent = async (event, ev: any) => {
	try {
		// console.log(event.locals)
		ev.createdBy = event.locals.user.id;
		ev.groupId = event.locals.group;
		await db.insert(tracking).values(ev);
		return {};
	} catch (e) {
		console.log((e as Error).message);
		// throw new Error((e as Error).message);
	}
};
