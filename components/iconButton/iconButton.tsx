import { ButtonHTMLAttributes, ReactNode } from 'react';
import getClassName from '@/utils/getClassName';
import LoaderIcon from '@/components/icons/loader';
import styles from './iconButton.module.css';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	loading?: boolean;
	size?: 'small' | 'medium' | 'large';
	status?: 'highpri' | 'normal' | 'trivial';
	title: string;
	transparent?: boolean;
}

const IconButton = ({
	children,
	className,
	loading,
	size = 'medium',
	status,
	transparent = false,
	type = 'button',
	...props
}: IconButtonProps) => {
	return (
		<>
			<button
				className={
					styles.button +
					getClassName(size === 'small', styles.small) +
					getClassName(size === 'large', styles.large) +
					getClassName(transparent, styles.transparent) +
					getClassName(className)
				}
				type={type}
				{...props}>
				{status && <span className={styles.status + ' ' + styles[status]} />}
				{loading ? <LoaderIcon /> : children}
			</button>
		</>
	);
};

export default IconButton;
