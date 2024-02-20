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

	return (
		<>
			<form
				action={formAction}
				onSubmit={() => setDesc('')}
				className={styles.form}>
				<Textarea
					autoFocus
					className={styles.textarea}
					disabled={pending}
					name='desc'
					value={desc}
					onChange={(e) => setDesc(e.target.value)}
					placeholder='Enter Description..'
				/>
				<IconButton
					className={styles.iconButton}
					disabled={!desc}
					title='Submit'
					type='submit'>
					<RightArrowIcon />
				</IconButton>
			</form>
		</>
	);
};

export default Form;
