'use client';

import { useFormStatus } from 'react-dom';

import IconButton from '@/components/iconButton/iconButton';
import RightArrowIcon from '@/components/icons/rightArrow';
import Textarea from '@/components/textarea/textarea';

import styles from './form.module.css';
import { useState } from 'react';

const Form = ({ formAction }: { formAction: (payload: FormData) => void }) => {
	const { pending } = useFormStatus();

	const [desc, setDesc] = useState('');
	const [prompt, setPrompt] = useState('');

	return (
		<>
			<form
				action={formAction}
				onSubmit={() => {
					setPrompt(desc);
					setDesc('');
				}}
				className={styles.form}>
				<Textarea
					autoFocus
					disabled={pending}
					name='desc'
					value={desc}
					onChange={(e) => setDesc(e.target.value)}
					placeholder='Enter an idea, thought or description..'
				/>
				<IconButton
					className={styles.iconButton}
					disabled={!desc}
					title='Submit'
					type='submit'>
					<RightArrowIcon />
				</IconButton>
			</form>
			{prompt && <div className={styles.prompt}>Prompt: {prompt}</div>}
		</>
	);
};

export default Form;
