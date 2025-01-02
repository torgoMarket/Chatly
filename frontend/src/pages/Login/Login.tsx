import { Link } from 'react-router-dom'
import { Form } from '../../components/Form/Form'
import { Field } from '../../components/Layouts/Field/Field'
import { Button } from '../../components/UI/Button/Button'
import styles from './Login.module.scss'
export const Login = () => {
	return (
		<div className={styles.login}>
			<Form>
				<Field label='email'></Field>
				<Field label='password'></Field>
				<Button>Login</Button>
				<Link to='/register'>No Account?</Link>
				<Link to='/recover'>Forget Password?</Link>
			</Form>
		</div>
	)
}
