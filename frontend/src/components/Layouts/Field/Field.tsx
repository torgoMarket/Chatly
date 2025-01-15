import clsx from 'clsx'
import styles from './Field.module.scss'

interface FieldProps {
	error?: string
	children: React.ReactNode
	className?: string
}

export const Field: React.FC<FieldProps> = ({ error, children, className }) => {
	return (
		<div className={clsx(styles.field, className, error && styles.error)}>
			{children}
			<span className={styles.error}>{error}</span>
		</div>
	)
}
