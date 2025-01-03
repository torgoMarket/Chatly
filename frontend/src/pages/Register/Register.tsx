import { Link } from 'react-router-dom'
import { Form } from '../../components/Form/Form'
import { Field } from '../../components/Layouts/Field/Field'
import { Button } from '../../components/UI/Button/Button'
import styles from './Register.module.scss'
export const Register = () => {
	return (
		<div className={styles.register}>
			<Form>
				<h3>Register</h3>
				<Field label='email'></Field>
				<Field label='password'></Field>
				<Field label='repeat password'></Field>
				<Button>Register</Button>
				<Link to='/login'>Have Account?</Link>
			</Form>
		</div>
	)
}
