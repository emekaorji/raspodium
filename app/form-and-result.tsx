'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import Result from './result';
import { useFormState } from 'react-dom';
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
			alert(state?.error.message);
		}
	}, [state?.error]);

	return (
		<>
			<form
				action={formAction}
				className={styles.form}
				onSubmit={(e) => {
					if (desc) setPrompt(desc);
					setDesc('');
					e.persist();
				}}>
				<FormFields desc={desc} handleChange={handleChange} />
				{prompt && <div className={styles.prompt}>Prompt: {prompt}</div>}
				<br />
				<Result words={state?.words} query={prompt} />
			</form>
		</>
	);
};

export default FormAndResult;
