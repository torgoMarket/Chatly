import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form } from '../../components/Form/Form'
import { Field } from '../../components/Layouts/Field/Field'
import { Button } from '../../components/UI/Button/Button'
import { Input } from '../../components/UI/Input/Input'
import { useValidate } from '../../hooks/useValidate'
import styles from './Login.module.scss'

const loginFields = [
	{ field: 'email', placeholder: 'Email', type: 'email' },
	{ field: 'password', placeholder: 'Password', type: 'password' },
]

export const Login = () => {
	const navigate = useNavigate()

	const [userData, setUserData] = useState(
		Object.fromEntries(loginFields.map(({ field }) => [field, '']))
	)

	const { error } = useValidate(userData)

	const login = () => {
		if (Object.values(error).some(err => err)) {
			return
		}

		navigate('/dashboard')
	}

	return (
		<div className={styles.login}>
			<Form>
				<h3 className={styles.formTitle}>Login</h3>
				{loginFields.map(({ field, placeholder, type }) => (
					<Field key={field} error={error[field] as string}>
						<Input
							placeholder={placeholder}
							type={type}
							scale='md'
							onChange={e =>
								setUserData({ ...userData, [field]: e.target.value })
							}
						/>
					</Field>
				))}
				<Button onClick={() => login()}>Login</Button>
				<Link to='/register' className={styles.link}>
					No Account?
				</Link>
				<Link to='/recover' className={styles.link}>
					Forget Password?
				</Link>
			</Form>
		</div>
	)
}
