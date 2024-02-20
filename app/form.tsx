'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitAction } from './actions';

const Form = () => {
	const [state, formAction] = useFormState(submitAction, {});
	const { pending } = useFormStatus();

	return (
		<>
			<form action={formAction}>
				<input
					name='desc'
					autoFocus
					disabled={pending}
					placeholder='Enter Description'
					type='text'
				/>
				<button type='submit'>Submit</button>
			</form>
		</>
	);
};

export default Form;
