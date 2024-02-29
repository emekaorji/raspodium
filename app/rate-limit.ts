import { raspodiumDB } from '@/db';
import { ips } from '@/db/schema';
import getRandomId from '@/utils/getRandomId';
import { eq } from 'drizzle-orm';

export interface IPDetails {
	id: string;
	ipAddress: string;
	calls: {
		id: string;
		timeStamp: number;
	}[];
}

export async function isRateLimited(
	ip: string
): Promise<IPDetails | undefined> {
	if (ip === 'local') return;

	const ipDetails = await raspodiumDB
		.select()
		.from(ips)
		.where(eq(ips.ipAddress, ip))
		.get();

	if (!ipDetails) {
		return undefined;
	}

	// Reorder the calls by timeStamp
	const sortedCalls = ipDetails.calls.sort((a, b) => a.timeStamp - b.timeStamp);

	// Get the 6th call from the bottom
	const sixthCall = sortedCalls[sortedCalls.length - 6];

	// Check the sixth call to see if it is within one hour
	// If it is, throw a rate limit error
	if (
		sixthCall &&
		new Date().getTime() - sixthCall.timeStamp < 60 * 60 * 1000
	) {
		throw new Error('Too many requests, try again after 1hr');
	}

	return ipDetails;
}

export async function setupIpTracking(ip: string, ipDetails?: IPDetails) {
	if (ip === 'local') return;

	const newCall = { id: getRandomId(), timeStamp: new Date().getTime() };

	if (ipDetails) {
		await raspodiumDB
			.update(ips)
			.set({
				calls: [...ipDetails.calls, newCall],
			})
			.where(eq(ips.ipAddress, ipDetails.ipAddress));
	} else {
		await raspodiumDB.insert(ips).values({
			id: getRandomId(),
			calls: [newCall],
			ipAddress: ip,
		});
	}
}
