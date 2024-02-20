'use client';

import {
	ChangeEvent,
	TextareaHTMLAttributes,
	useCallback,
	useState,
} from 'react';

import getClassName from '@/utils/getClassName';
import styles from './textarea.module.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = ({ className, onChange, ...props }: TextareaProps) => {
	const [height, setHeight] = useState('auto');

	const handleChange = useCallback(
		(event: ChangeEvent<HTMLTextAreaElement>) => {
			const textareaLineHeight = 24;
			const previousRows = event.target.rows;
			event.target.rows = 1;
			const newRows = Math.ceil(
				(event.target.scrollHeight - 8) / textareaLineHeight
			);
			if (newRows === previousRows) {
				event.target.rows = newRows;
			} else {
				setHeight(`${newRows * textareaLineHeight + 8}px`);
			}
			if (onChange) onChange(event);
		},
		[onChange]
	);

	return (
		<>
			<textarea
				rows={1}
				style={{ height }}
				className={styles.textarea + getClassName(className)}
				onChange={handleChange}
				onKeyDown={(e) => {
					if (
						(e.ctrlKey || e.metaKey) &&
						(e.key === 'Enter' || e.key === 'NumpadEnter')
					) {
						e.preventDefault();
						e.currentTarget.form?.requestSubmit();
					}
				}}
				{...props}
			/>
		</>
	);
};

export default Textarea;
