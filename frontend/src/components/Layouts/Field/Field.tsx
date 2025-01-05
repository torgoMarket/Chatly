import clsx from 'clsx'
import styles from './Field.module.scss'

interface FieldProps {
	label?: string
	error?: string
	children: React.ReactNode
}

export const Field: React.FC<FieldProps> = ({ label, error, children }) => {
	return (
		<div className={clsx(styles.field, error && styles.error)}>
			{label && <label className={styles.label}>{label}</label>}
			{children}
			<span className={styles.error}>{error}</span>
		</div>
	)
}
