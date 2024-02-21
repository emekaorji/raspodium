'use client';

import React from 'react';
import Form from './form';
import Result from './result';
import { useFormState, useFormStatus } from 'react-dom';
import { submitAction } from './actions';

const FormAndResult = () => {
	const [state, formAction] = useFormState(submitAction, null);

	console.log(state?.words);

	return (
		<>
			<Form formAction={formAction} />
			<br />
			<Result words={state?.words} />
		</>
	);
};

export default FormAndResult;
