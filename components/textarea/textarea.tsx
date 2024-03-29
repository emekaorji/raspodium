'use client';

import {
	ChangeEvent,
	TextareaHTMLAttributes,
	useCallback,
	useState,
} from 'react';

import getClassName from '@/utils/getClassName';
import styles from './textarea.module.css';
import { useFormStatus } from 'react-dom';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	containerClassName?: string;
}

const Textarea = ({
	className,
	containerClassName,
	...props
}: TextareaProps) => {
	const [inputValue, setInputValue] = useState('');

	return (
		<>
			<div
				className={styles.textAreaContainer + getClassName(containerClassName)}
				data-value={inputValue}>
				<textarea
					className={styles.textarea + getClassName(className)}
					onInput={(e) => {
						setInputValue((e.target as HTMLTextAreaElement).value);
					}}
					onKeyDown={(e) => {
						if (
							(e.ctrlKey || e.metaKey) &&
							(e.key === 'Enter' || e.key === 'NumpadEnter') &&
							(e.target as HTMLTextAreaElement).value
						) {
							e.preventDefault();
							e.currentTarget.form?.requestSubmit();
						}
					}}
					{...props}
				/>
			</div>
		</>
	);
};

export default Textarea;
