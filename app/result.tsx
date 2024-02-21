'use client';

import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';

import { Word, Words } from './actions';

import styles from './result.module.css';
import getClassName from '@/utils/getClassName';

// const sampleWords: Words = [
// 	{
// 		id: '1',
// 		word: 'panting',
// 		type: 'word',
// 		usage: ['She was panting heavily after the long run.'],
// 		meanings: [
// 			'the action of breathing with short, quick breaths, especially with difficulty',
// 		],
// 		synonyms: ['gasping', 'heaving', 'huffing'],
// 		score: 90,
// 		transcription: '\\',
// 		speechPart: 'Verb',
// 	},
// 	{
// 		id: '2',
// 		word: 'huffing and puffing',
// 		type: 'phrase',
// 		usage: ['He was huffing and puffing after climbing up the steep hill.'],
// 		meanings: [
// 			'breathing heavily and noisily, especially through exertion or excitement',
// 		],
// 		synonyms: ['breathing heavily', 'panting', 'gasping'],
// 		score: 95,
// 		transcription: null,
// 		speechPart: 'Phrase',
// 	},
// 	{
// 		id: '3',
// 		word: 'gasping',
// 		type: 'word',
// 		usage: ['She was gasping for air after running to catch the bus.'],
// 		meanings: [
// 			'breathe in quickly and with difficulty, typically as a result of exertion or surprise',
// 		],
// 		synonyms: ['panting', 'heaving', 'huffing'],
// 		score: 85,
// 		transcription: 'ˈɡæspɪŋ',
// 		speechPart: 'Verb',
// 	},
// 	{
// 		id: '4',
// 		word: 'wheezing',
// 		type: 'word',
// 		usage: ['He was wheezing after a long, tiring day at work.'],
// 		meanings: [
// 			'breathe with a whistling or rattling sound in the chest, as a result of obstruction in the air passages',
// 		],
// 		synonyms: ['breathing heavily', 'panting', 'gasping'],
// 		score: 80,
// 		transcription: 'ˈwēz',
// 		speechPart: 'Verb',
// 	},
// 	{
// 		id: '5',
// 		word: 'out of breath',
// 		type: 'phrase',
// 		usage: ['She was out of breath after climbing the stairs.'],
// 		meanings: ['having difficulty breathing; breathless'],
// 		synonyms: ['breathless', 'panting', 'gasping'],
// 		score: 90,
// 		transcription: null,
// 		speechPart: 'Phrase',
// 	},
// ];

const Result = ({ words }: { words?: Words }) => {
	const { pending } = useFormStatus();

	const [results, setResults] = useState<Words>(words || []);

	useEffect(() => {
		if (words) setResults(words);
	}, [words]);

	return (
		<>
			<div className={styles.resultContainer}>
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
			<div
				className={
					styles.card + getClassName(word.type === 'phrase', styles.isPhrase)
				}>
				<div className={styles.title}>
					<h3>{word.word}</h3>
					{word.transcription && <span>/{word.transcription}/</span>}{' '}
					<span className={styles.speechPart}>({word.speechPart})</span>
				</div>
				<div className={styles.section}>
					{word.meanings.map((meaning, index) => (
						<p key={index}>{meaning}</p>
					))}
				</div>
				<div className={styles.section}>
					<h4>USAGE</h4>
					{word.usage.map((usage, index) => (
						<p key={index}>{usage}</p>
					))}
				</div>
				<div className={styles.section}>
					<h4>SYNONYMS</h4>
					<div className={styles.synonyms}>
						{word.synonyms.map((synonym, index, arr) => (
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

export default Result;
