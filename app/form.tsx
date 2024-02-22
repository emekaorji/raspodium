'use client';

import { useFormStatus } from 'react-dom';

import IconButton from '@/components/iconButton/iconButton';
import RightArrowIcon from '@/components/icons/rightArrow';
import Textarea from '@/components/textarea/textarea';

import styles from './form.module.css';
import { ChangeEvent, ChangeEventHandler, ReactNode, useState } from 'react';

interface FormProps {
	children: ReactNode;
	formAction: (payload: FormData) => void;
}

const Form = ({ children, formAction }: FormProps) => {
	const [desc, setDesc] = useState('');
	const [prompt, setPrompt] = useState('');

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setDesc(event.target.value);
	};

	return (
		<>
			<form
				action={formAction}
				className={styles.form}
				onSubmit={() => {
					setPrompt(desc);
					setDesc('');
				}}>
				<FormFields desc={desc} handleChange={handleChange} />
				{prompt && <div className={styles.prompt}>Prompt: {prompt}</div>}
				<br />
				{children}
			</form>
		</>
	);
};

interface FormFieldsProps {
	desc: string;
	handleChange: ChangeEventHandler<HTMLTextAreaElement>;
}

const FormFields = ({ desc, handleChange }: FormFieldsProps) => {
	const { pending } = useFormStatus();

	return (
		<>
			<label className={styles.label}>
				<Textarea
					autoFocus
					disabled={pending}
					name='desc'
					value={desc}
					onChange={handleChange}
					placeholder='Enter an idea, thought or description..'
				/>
				<IconButton
					className={styles.iconButton}
					disabled={!desc}
					title='Submit'
					type='submit'>
					<RightArrowIcon />
				</IconButton>
			</label>
		</>
	);
};

export default Form;
