import { SelectHTMLAttributes } from 'react'
import styles from './Select.module.scss'

interface Option {
	value: string
	label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	options: Option[]
}

export const Select: React.FC<SelectProps> = ({ options, ...props }) => {
	return (
		<select className={styles.select} {...props}>
			{options.map(option => (
				<option
					key={option.value}
					value={option.value}
					className={styles.option}
				>
					{option.label}
				</option>
			))}
		</select>
	)
}
