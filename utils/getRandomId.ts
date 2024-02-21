export default function getRandomId(length = 12) {
	const rounds = Math.ceil(length / 10);
	let fullString = '';
	for (let i = 0; i < rounds; i++) {
		fullString += Math.random().toString(16).slice(2).slice(0, 12);
	}
	return fullString.slice(0, length);
}
