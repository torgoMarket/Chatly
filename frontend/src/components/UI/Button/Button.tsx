import clsx from 'clsx'
import React, { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	size?: 'sm' | 'md' | 'lg'
}

export const Button: React.FC<ButtonProps> = ({
	children,
	size = 'md',
	className,
	...props
}) => {
	return (
		<button className={clsx(styles.btn, styles[size], className)} {...props}>
			{children}
		</button>
	)
}
