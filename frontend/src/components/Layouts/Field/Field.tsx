import clsx from 'clsx'
import styles from './Field.module.scss'

interface FieldProps {
	label?: string
	error?: string
	children: React.ReactNode
	className?: string
}

export const Field: React.FC<FieldProps> = ({
	label,
	error,
	children,
	className,
}) => {
	return (
		<div className={clsx(styles.field, className, error && styles.error)}>
			{label && <label className={styles.label}>{label}</label>}
			{children}
			<span className={styles.error}>{error}</span>
		</div>
	)
}
