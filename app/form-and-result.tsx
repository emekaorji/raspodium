'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { useFormState } from 'react-dom';

import Result from './result';
import { submitAction } from './actions';
import FormFields from './form-fields';
import styles from './form-and-result.module.css';

const FormAndResult = () => {
	const [state, formAction] = useFormState(submitAction, null);

	const [desc, setDesc] = useState('');
	const [prompt, setPrompt] = useState('');

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setDesc(event.target.value);
	};

	useEffect(() => {
		if (state?.error) {
			toast(state.error.message);
		}
	}, [state?.error]);

	return (
		<>
			<form
				action={formAction}
				className={styles.form}
				onSubmit={(e) => {
					/* -------------------------------------------- *
					 * For some reason, this block is really important
					 * for `useFormStatus` hook to work as expected
					 * -------------------------------------------- */
					e.persist();
					if (desc) setPrompt(desc);
					setTimeout(() => {
						setDesc('');
					}, 0);
				}}>
				<Toaster
					position='top-right'
					richColors
					closeButton
					toastOptions={{ style: { backgroundColor: '#ffffffdd' } }}
				/>
				<FormFields desc={desc} handleChange={handleChange} />
				{prompt && <div className={styles.prompt}>Prompt: {prompt}</div>}
				<br />
				<Result words={state?.words} query={prompt} />
			</form>
		</>
	);
};

export default FormAndResult;
