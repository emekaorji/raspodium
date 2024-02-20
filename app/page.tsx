'use server';

import styles from './page.module.css';
import FormAndResult from './form-and-result';

export default async function Home() {
	return (
		<main className={styles.main}>
			<div className={styles.center} />
			<h1>Find the words at the back of your tongue faster</h1>
			<br />
			<FormAndResult />
		</main>
	);
}
