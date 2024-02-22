'use client';

import { useFormStatus } from 'react-dom';

import IconButton from '@/components/iconButton/iconButton';
import RightArrowIcon from '@/components/icons/rightArrow';
import Textarea from '@/components/textarea/textarea';

import styles from './form-fields.module.css';
import { ChangeEventHandler } from 'react';

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

export default FormFields;
