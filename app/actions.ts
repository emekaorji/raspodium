'use server';

import OpenAI from 'openai';
import { ZodFunctionDef, toTool } from 'openai-zod-functions';
import { z } from 'zod';
import { headers } from 'next/headers';
import { raspodiumDB } from '@/db';
import { ips } from '@/db/schema';
import getRandomId from '@/utils/getRandomId';
import { eq } from 'drizzle-orm';

const ai = new OpenAI({
	apiKey: process.env.OPEN_AI_KEY,
});

const WordSchema = z.object({
	id: z
		.string()
		.describe(
			'The word or phrase id. It should be 10 characters long and unique'
		),
	word: z.string().describe('The matching word or phrase'),
	type: z
		.enum(['word', 'phrase'])
		.describe('The type of the output term whether it is a word or phrase'),
	usage: z.array(
		z
			.string()
			.describe(
				'Example sentence in which the word or phrase is used in context of the description'
			)
	),
	meanings: z.array(
		z.string().describe('A brief or elaborate meaning of the word or phrase')
	),
	synonyms: z.array(z.string().describe('The synonyms of the word or phrase')),
	score: z
		.number()
		.describe(
			'A 1..100 score indicating how grammatically similar the word or phrase is to the original description'
		),
	transcription: z
		.string()
		.nullable()
		.describe('The transcription of the word'),
	speechPart: z
		.string()
		.describe(
			'The part of speech of the word or phrase e.g Noun, Adverb, Adjectival Clause, Adverbial Phrase etc.'
		),
});

export type Word = z.infer<typeof WordSchema>;

const WordsSchema = z.array(WordSchema);

const prompt = (desc: string) => `
give me 5 words or idiomatic phrases/clauses that match the following description:

---
${desc}
---

Follow the following instructions accurately:

- Provide one or more dictionary meaning of the word or phrase
- Provide one or more real world sentences usage where the words are used in context of the description
- Provide a score on a scale of 1 to 100 indicating how grammatically similar the word is to the description
- A word could be a Noun, Adjective, Adverb, Verb or any other part of speech
- Indicate the type of the output term, whether it is a 'word' or 'phrase'
- If it is of type 'word', provide the transcription of the word
- If it is of type 'phrase', don't provide a transcription of the phrase
- If available, add up to 5 or less synonyms for each word or phrase
`;

export type Words = z.infer<typeof WordsSchema>;

export type SubmitActionData = {
	words?: Words;
	error?: {
		code: 'ERROR';
		message: string;
	};
};

function isRateLimited(
	calls: {
		id: string;
		timeStamp: number;
	}[]
): boolean {
	return true;
}

export async function submitAction(
	_prevState: any,
	formData: FormData
): Promise<SubmitActionData | null> {
	try {
		const ip = headers().get('x-real-ip') ?? 'local';
		console.log(ip);

		const ipDetails = await raspodiumDB
			.select()
			.from(ips)
			.where(eq(ips.ipAddress, ip))
			.get();

		if (ipDetails && isRateLimited(ipDetails.calls)) {
			throw new Error('Too many requests, try again after 1hr');
		}

		const desc = formData.get('desc') as string;
		console.log(desc);

		console.log('start');
		const { words }: { words: Words } = await complete(prompt(desc), [
			{
				name: 'get_matching_words',
				description: 'Get words that match a description',
				schema: z.object({
					words: WordsSchema,
				}),
			},
		]);

		console.log(words);

		raspodiumDB
			.insert(ips)
			.values({ id: getRandomId(), calls: [], ipAddress: ip });

		return { words };
	} catch (error: any) {
		console.log(error);
		return { error: { code: 'ERROR', message: error.message } };
	}
}

async function complete(prompt: string, functions: ZodFunctionDef[]) {
	const completions = await ai.chat.completions.create({
		model: 'gpt-3.5-turbo-1106',
		messages: [
			{
				role: 'system',
				content:
					'You are a helpful assistant that takes a very random vague idea or concept and provides a list of words that best describes that idea in a dictionary-like manner',
			},
			{
				role: 'user',
				content: prompt,
			},
		],
		tools: functions.map(toTool),
		temperature: 1,
		tool_choice: 'auto',
	});

	if (!completions?.choices[0]?.message?.tool_calls?.length) {
		return [];
	}

	return JSON.parse(
		completions.choices[0].message.tool_calls[0].function.arguments
	);
}

/**
 * User
 * "Something that occurs spontaneously and leaves you speechless"
 *
 * Assistant
 * [
 *  {
 *    word: "Startle",
 *    meaning: "Cause to feel sudden shock or alarm",
 *  }
 * ]
 */
