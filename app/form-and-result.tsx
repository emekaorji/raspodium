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
			<Form formAction={formAction}>
				<Result words={state?.words} />
			</Form>
		</>
	);
};

export default FormAndResult;
