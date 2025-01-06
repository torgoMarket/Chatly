import { SelectHTMLAttributes } from 'react'
import styles from './Select.module.scss'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	options: string[]
}

export const Select: React.FC<SelectProps> = ({ options, ...props }) => {
	return (
		<select className={styles.select} {...props}>
			{options &&
				options.map(option => (
					<option key={option} value={option} className={styles.option}>
						{option}
					</option>
				))}
		</select>
	)
}
