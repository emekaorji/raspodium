import { z } from 'zod';
import { OpenAI } from 'openai';
import { ZodFunctionDef, toTool } from 'openai-zod-functions';
import type { NextRequest } from 'next/server';

export const maxDuration = 120;

const ai = new OpenAI({
	baseURL: 'https://api.endpoints.anyscale.com/v1',
	apiKey: process.env.ANYSCALE_API_KEY,
});

// const StorySchema = z.object({
// 	title: z
// 		.string()
// 		.describe(
// 			"The title of the HN story. If it's a hiring story, it should be in the classic HN format"
// 		),
// 	username: z.string().describe('The username of the author'),
// 	domain: z.string().describe('The domain of the story'),
// 	type: z.enum(['show', 'jobs', 'ask', 'story']).describe('The type of story'),
// 	points: z.number(),
// });

const WordSchema = z.object({
	id: z.string().describe('The numeric word id. It should be numeric'),
	reply_to_id: z
		.string()
		.optional()
		.describe('The numeric id of the comment id this replies to'),
	username: z.string().describe('The username of the author'),
	comment: z.string().describe('The comment text'),
});

const WordsSchema = z.array(WordSchema);

type Words = z.infer<typeof WordsSchema>;

export async function GET(request: NextRequest) {
	console.log(request.body);
	const { words }: { words: Words } = await complete(
		`give me 5 words that match the following description:

	---

	---

	Follow the following instructions accurately:

	- Make the titles as realistic as possible.
	- If the story is in the first person and showing some work, prefix it with Show HN:
	- If the story is a question, prefix it with Ask HN:
	- If the story is about hiring, use the HN format for example '{Company} (YC {Season}) is hiring {Role}'. Replace the {} variables with creative values
	- Most titles should not be in the first person, and should not be prefixed.
	- NEVER include a prefix like "Prefix:" for jobs and hiring titles
	- Only include at most 1 show, 1 ask and 1 hiring title
	`,
		[
			{
				name: 'get_matching_words',
				description: 'Get words that match the given description',
				schema: z.object({
					stories: WordsSchema,
				}),
			},
		]
	);

	return Response.json({ success: true });
}

async function complete(prompt: string, functions: ZodFunctionDef[]) {
	const completions = await ai.chat.completions.create({
		model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
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
