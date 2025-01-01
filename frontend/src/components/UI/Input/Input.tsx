import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	scale?: 'sm' | 'md' | 'lg'
}

export const Input: React.FC<InputProps> = ({ scale = 'md', ...props }) => {
	return <input className={clsx(styles.input, styles[scale])} {...props} />
}
