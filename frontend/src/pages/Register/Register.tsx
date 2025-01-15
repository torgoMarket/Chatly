import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form } from '../../components/Form/Form'
import { Field } from '../../components/Layouts/Field/Field'
import { Button } from '../../components/UI/Button/Button'
import { Input } from '../../components/UI/Input/Input'
import { useCheckAuth } from '../../hooks/useCheckAuth'
import { useValidate } from '../../hooks/useValidate'
import { registerUser } from '../../services/userService'
import { TUserRegister } from '../../types/userTypes'
import styles from './Register.module.scss'

const registerFields = [
	{ field: 'name', placeholder: 'Name', type: 'text' },
	{ field: 'email', placeholder: 'Email', type: 'email' },
	{ field: 'password', placeholder: 'Password', type: 'password' },
	{ field: 'repeatPassword', placeholder: 'Repeat Password', type: 'password' },
]

export const Register = () => {
	const navigate = useNavigate()
	const [userData, setUserData] = useState<TUserRegister>({
		name: '',
		email: '',
		password: '',
		repeatPassword: '',
	})
	const [formError, setFormError] = useState<string>('')

	useCheckAuth()

	const { error } = useValidate(userData)

	const register = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (Object.values(error).some(err => err)) {
			return
		}

		const response = await registerUser(userData)

		if (response?.data?.error?.ConstraintName === 'uni_users_email') {
			setFormError('Email is already used')
		}

		if (response?.status === 200) {
			setFormError('')
			navigate('/login')
		}
	}

	return (
		<div className={styles.register}>
			<Form onSubmit={register}>
				<h3 className={styles.formTitle}>Register</h3>

				{registerFields.map(({ field, placeholder, type }) => (
					<Field key={field} error={error[field] as string}>
						<Input
							placeholder={placeholder}
							type={type}
							scale='md'
							onChange={e =>
								setUserData(prevData => ({
									...prevData,
									[field]: e.target.value,
								}))
							}
						/>
					</Field>
				))}

				<span className={styles.error}>{formError}</span>

				<Button type='submit'>Register</Button>
				<Link to='/login' className={styles.link}>
					Have Account?
				</Link>
			</Form>
		</div>
	)
}
