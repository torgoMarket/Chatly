import { Link } from 'react-router-dom'
import { Form } from '../../components/Form/Form'
import { Field } from '../../components/Layouts/Field/Field'
import { Button } from '../../components/UI/Button/Button'
import { Input } from '../../components/UI/Input/Input'
import styles from './Register.module.scss'
export const Register = () => {
	return (
		<div className={styles.register}>
			<Form>
				<h3 className={styles.formTitle}>Register</h3>
				<Field label='email'>
					<Input placeholder='Email' scale='md' />
				</Field>
				<Field label='password'>
					<Input placeholder='Password' scale='md' />
				</Field>
				<Field label='repeat password'>
					<Input placeholder='Repeat Password' scale='md' />
				</Field>
				<Button>Register</Button>
				<Link to='/login' className={styles.link}>
					Have Account?
				</Link>
			</Form>
		</div>
	)
}
