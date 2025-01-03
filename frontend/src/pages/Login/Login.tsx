import { Link, useNavigate } from 'react-router-dom'
import { Form } from '../../components/Form/Form'
import { Field } from '../../components/Layouts/Field/Field'
import { Button } from '../../components/UI/Button/Button'
import styles from './Login.module.scss'
export const Login = () => {
	const navigate = useNavigate()
	const handleForm = () => {
		navigate('/dashboard')
	}

	return (
		<div className={styles.login}>
			<Form>
				<h3>Login</h3>
				<Field label='email'></Field>
				<Field label='password'></Field>
				<Button onClick={() => handleForm()}>Login</Button>
				<Link to='/register'>No Account?</Link>
				<Link to='/recover'>Forget Password?</Link>
			</Form>
		</div>
	)
}
