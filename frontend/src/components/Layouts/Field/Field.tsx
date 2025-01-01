import clsx from 'clsx'
import { Input } from '../../UI/Input/Input'
import styles from './Field.module.scss'

interface FieldProps {
	label?: string
	type?: string
	placeholder?: string
	value?: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	error?: string
}

export const Field: React.FC<FieldProps> = ({
	label,
	type = 'text',
	value,
	placeholder,
	onChange,
	error,
}) => {
	return (
		<div className={clsx(styles.field, error && styles.error)}>
			{label && <label className={styles.label}>{label}</label>}
			<Input
				type={type}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
			></Input>
			<span className={styles.error}>{error}</span>
		</div>
	)
}
