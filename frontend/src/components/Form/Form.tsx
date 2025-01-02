import styles from './Form.module.scss'

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
	children: React.ReactNode
}

export const Form: React.FC<FormProps> = ({ children, ...props }) => {
	return (
		<form className={styles.form} {...props}>
			{children}
		</form>
	)
}
