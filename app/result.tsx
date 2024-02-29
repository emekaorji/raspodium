'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';

import { Word, Words } from './actions';

import styles from './result.module.css';
import getClassName from '@/utils/getClassName';
import Button from '@/components/button/button';

const sampleWords: Words = [
	{
		id: 'a8be2yntc9',
		word: 'rehearse',
		type: 'word',
		usage: [
			'He had to rehearse his lines over and over again to get them right.',
		],
		meanings: ['to practice something by repeating it over and over'],
		synonyms: ['practice', 'drill', 'recite', 'iterate'],
		score: 90,
		transcription: 'rɪˈhɜrs',
		speechPart: 'verb',
	},
	{
		id: '7dns38hdx5',
		word: 'recapitulate',
		type: 'word',
		usage: [
			'I had to recapitulate the key points of the meeting to remember them clearly.',
		],
		meanings: ['to summarize and repeat the main points'],
		synonyms: ['summarize', 'review', 'restate', 'recite'],
		score: 85,
		transcription: 'ˌriːkəˈpɪtjəleɪt',
		speechPart: 'verb',
	},
	{
		id: 'f9s8h3n1dy',
		word: 'constantly',
		type: 'word',
		usage: [
			'She kept going over the instructions constantly to make sure she understood them.',
		],
		meanings: ['continuously, over and over again'],
		synonyms: ['continuously', 'persistently', 'incessantly', 'repeatedly'],
		score: 80,
		transcription: 'ˈkɒnstəntli',
		speechPart: 'adverb',
	},
	{
		id: 'd28ng1n9kc',
		word: 'regurgitate',
		type: 'word',
		usage: [
			'Students often have to regurgitate information in exams without fully understanding it.',
		],
		meanings: ['to repeat something without fully understanding it'],
		synonyms: ['repeat', 'parrot', 'recite', 'reproduce'],
		score: 75,
		transcription: 'rɪˈɡɜrdʒɪteɪt',
		speechPart: 'verb',
	},
	{
		id: '8d2n4kd95s',
		word: 'parrot fashion',
		type: 'phrase',
		usage: [
			"He learned the speech parrot fashion, but he didn't understand its meaning.",
		],
		meanings: ['to repeat something from memory without understanding it'],
		score: 80,
		synonyms: [],
		transcription: '',
		speechPart: 'adverb',
	},
];

interface ResultProps {
	words?: Words;
	query?: string;
}

const Result = ({ words, query }: ResultProps) => {
	const { pending, ...p } = useFormStatus();

	const [results, setResults] = useState<Words>(words || []);
	const numberOfCalls = useRef(0);
	const search = useRef('');

	useEffect(() => {
		if (words) {
			setResults((prev) => {
				const newWords = prev.concat(words);
				return [...newWords];
			});
			numberOfCalls.current++;
		}
	}, [words]);

	useEffect(() => {
		if (search.current !== query) {
			setResults([]);
			numberOfCalls.current = 0;
		}
		search.current = query || '';
	}, [query]);

	return (
		<>
			<div className={styles.resultContainer}>
				{results.map((result) => (
					<ResultCard key={result.id} word={result} />
				))}
				{pending ? (
					<>
						<ResultCardBuffer />
						<ResultCardBuffer />
						<ResultCardBuffer />
						<ResultCardBuffer />
					</>
				) : (
					<></>
				)}
				{numberOfCalls.current < 2 && results.length ? (
					<>
						<input type='hidden' name='fetchMore-Query' defaultValue={query} />
						<input
							type='hidden'
							name='fetchMore-Omit'
							defaultValue={results.map((i) => i.word).join(', ')}
						/>
						<Button className={styles.button} disabled={pending} type='submit'>
							More+
						</Button>
					</>
				) : (
					<></>
				)}
			</div>
		</>
	);
};

const ResultCard = ({ word }: { word: Word }) => {
	return (
		<>
			<div
				className={
					styles.card + getClassName(word.type === 'phrase', styles.isPhrase)
				}>
				<div className={styles.title}>
					<h3>{word.word}</h3>
					{word.transcription && <span>/{word.transcription}/</span>}
					{word.speechPart && (
						<span className={styles.speechPart}> ({word.speechPart})</span>
					)}
				</div>
				<div className={styles.section}>
					{word.meanings?.map((meaning, index) => (
						<p key={index}>{meaning}</p>
					))}
				</div>
				<div className={styles.section}>
					<h4>USAGE</h4>
					{word.usage?.map((usage, index) => (
						<p key={index}>{usage}</p>
					))}
				</div>
				<div className={styles.section}>
					<h4>SYNONYMS</h4>
					<div className={styles.synonyms}>
						{word.synonyms?.map((synonym, index, arr) => (
							<span key={index}>
								{synonym}
								{index !== arr.length - 1 && ', '}
							</span>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

const ResultCardBuffer = () => {
	return (
		<>
			<div className={styles.cardBuffer} />
		</>
	);
};

export default Result;
