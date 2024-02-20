'use server';

import Image from 'next/image';
import styles from './page.module.css';
// import { textGeneration } from '@huggingface/inference';
// import { HfAgent } from '@huggingface/agents';
import Form from './form';

export default async function Home() {
	// const trans = await textGeneration({
	// 	inputs: 'President of Nigeria',
	// 	accessToken: process.env.HUGGING_FACE_TOKEN,
	// });

	// console.log(trans);

	return (
		<main className={styles.main}>
			<div className={styles.description}>
				<p>
					Get started by editing&nbsp;
					<code className={styles.code}>app/page.tsx</code>
				</p>
				<div>
					<a
						href='https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
						target='_blank'
						rel='noopener noreferrer'>
						By{' '}
						<Image
							src='/vercel.svg'
							alt='Vercel Logo'
							className={styles.vercelLogo}
							width={100}
							height={24}
							priority
						/>
					</a>
				</div>
			</div>

			<div className={styles.center}>
				<Image
					className={styles.logo}
					src='/next.svg'
					alt='Next.js Logo'
					width={180}
					height={37}
					priority
				/>
			</div>

			<div className={styles.grid}>
				<Form />
			</div>
		</main>
	);
}
