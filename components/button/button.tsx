import { ButtonHTMLAttributes } from 'react';
import getClassName from '@/utils/getClassName';
import LoaderIcon from '@/components/icons/loader';
import styles from './button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean;
}

const Button = ({
	children,
	className,
	loading,
	type = 'button',
	...props
}: ButtonProps) => {
	return (
		<>
			<button className={styles.button + getClassName(className)} {...props}>
				{loading ? <LoaderIcon /> : children}
			</button>
		</>
	);
};

export default Button;
