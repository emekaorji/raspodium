'use server';

import OpenAI from 'openai';
import { ZodFunctionDef, toTool } from 'openai-zod-functions';
import { z } from 'zod';

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
	meaning: z.array(
		z.string().describe('A brief or elaborate meaning of the word or phrase')
	),
	score: z
		.string()
		.describe(
			'A 1..100 score indicating how grammatically similar the word or phrase is to the original description'
		),
	transliteration: z
		.string()
		.optional()
		.describe('The transliteration of the word'),
	speechPart: z
		.string()
		.describe(
			'The part of speech of the word or phrase e.g Noun, Adverb, Adjectival Clause, Adverbial Phrase etc.'
		),
});

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
- If it is a word, provide the transliteration of the word
`;

type Words = z.infer<typeof WordsSchema>;

export type SubmitActionData = {
	error?: {
		code: 'ERROR';
		message: string;
	};
};

export async function submitAction(
	_prevState: any,
	formData: FormData
): Promise<SubmitActionData | void> {
	const desc = formData.get('desc') as string;
	console.log(desc);

	try {
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

		console.log('end');
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