import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form } from '../../components/Form/Form'
import { Field } from '../../components/Layouts/Field/Field'
import { Button } from '../../components/UI/Button/Button'
import { Input } from '../../components/UI/Input/Input'
import { useValidate } from '../../hooks/useValidate'
import styles from './Register.module.scss'

const registerFields = [
	{ field: 'name', placeholder: 'Name', type: 'text' },
	{ field: 'email', placeholder: 'Email', type: 'email' },
	{ field: 'password', placeholder: 'Password', type: 'password' },
	{ field: 'repeatPassword', placeholder: 'Repeat Password', type: 'password' },
]

export const Register = () => {
	const [userData, setUserData] = useState(
		Object.fromEntries(registerFields.map(({ field }) => [field, '']))
	)

	const { error } = useValidate(userData)

	const register = () => {
		if (Object.values(error).some(err => err)) {
			return
		}

		console.log('userData', userData)
	}

	return (
		<div className={styles.register}>
			<Form>
				<h3 className={styles.formTitle}>Register</h3>

				{registerFields.map(({ field, placeholder, type }) => (
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

				<Button type='button' onClick={() => register()}>
					Register
				</Button>
				<Link to='/login' className={styles.link}>
					Have Account?
				</Link>
			</Form>
		</div>
	)
}
