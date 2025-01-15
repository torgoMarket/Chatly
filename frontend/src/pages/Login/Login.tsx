import { AxiosResponse } from 'axios'
import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form } from '../../components/Form/Form'
import { Field } from '../../components/Layouts/Field/Field'
import { Button } from '../../components/UI/Button/Button'
import { Input } from '../../components/UI/Input/Input'
import { useCheckAuth } from '../../hooks/useCheckAuth'
import { useValidate } from '../../hooks/useValidate'
import { loginUser } from '../../services/userService'
import { TUserLogin } from '../../types/userTypes'
import styles from './Login.module.scss'

const loginFields = [
	{ field: 'email', placeholder: 'Email', type: 'email' },
	{ field: 'password', placeholder: 'Password', type: 'password' },
]

export const Login = () => {
	const navigate = useNavigate()

	useCheckAuth()

	const [userData, setUserData] = useState<TUserLogin>({
		email: '',
		password: '',
	})

	const [formError, setFormError] = useState<string>('')

	const { error } = useValidate(userData)

	const login = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (Object.values(error).some(err => err)) {
			return
		}

		const response = (await loginUser(userData)) as AxiosResponse
		console.log('response?.data?.error', response?.data?.error)

		if (response?.data?.error === 'Invalid Email or Password') {
			setFormError('Invalid Email or Password')
		}
		if (response.status === 200) {
			setFormError('')
			navigate('/dashboard')
		}
	}

	return (
		<div className={styles.login}>
			<Form onSubmit={e => login(e)}>
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

				<span className={styles.error}>{formError}</span>

				<Button type='submit'>Login</Button>
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
