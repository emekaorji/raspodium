'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Word, Words } from './actions';

const sampleWords: Words = [
	{
		id: '1',
		word: 'Glutton',
		type: 'word',
		usage: ["She's a real glutton when it comes to chocolate."],
		meaning: [
			'A person who eats or consumes immoderate quantities of food and drink.',
		],
		score: '90',
		speechPart: 'Noun',
	},
	{
		id: '2',
		word: 'Voracious',
		type: 'word',
		usage: ['His voracious appetite for pizza is well known.'],
		meaning: [
			'Having a very eager approach to an activity, such as eating food.',
		],
		score: '85',
		speechPart: 'Adjective',
	},
	{
		id: '3',
		word: 'Pig Out',
		type: 'phrase',
		usage: ['He tends to pig out at all-you-can-eat buffets.'],
		meaning: [
			'To eat a large amount of food, especially in an indulgent or uncontrolled way.',
		],
		score: '80',
		speechPart: 'Verb',
	},
	{
		id: '4',
		word: 'Gourmand',
		type: 'word',
		usage: ["She's a true gourmand, always exploring new and exotic cuisines."],
		meaning: [
			'A person who enjoys eating and often eats too much, especially of good food.',
		],
		score: '88',
		speechPart: 'Noun',
	},
	{
		id: '5',
		word: "Stuff One's Face",
		type: 'phrase',
		usage: ['He likes to stuff his face with snacks in front of the TV.'],
		meaning: [
			'To eat a large amount of food, especially quickly and in a way that is not polite or graceful.',
		],
		score: '82',
		speechPart: 'Verb',
	},
];

const Result = ({ words }: { words?: Words }) => {
	const { pending } = useFormStatus();

	const [results, setResults] = useState<Words>(words || sampleWords || []);

	return (
		<>
			<div>
				{results.map((result) => (
					<ResultCard key={result.id} word={result} />
				))}
			</div>
		</>
	);
};

const ResultCard = ({ word }: { word: Word }) => {
	return (
		<>
			<div>{word.word}</div>
		</>
	);
};

export default Result;
