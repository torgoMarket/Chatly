import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form } from '../../components/Form/Form'
import { Field } from '../../components/Layouts/Field/Field'
import { Button } from '../../components/UI/Button/Button'
import { Input } from '../../components/UI/Input/Input'
import { useValidate } from '../../hooks/useValidate'
import styles from './Recover.module.scss'
export const Recover = () => {
	const navigate = useNavigate()
	const [stage, setStage] = useState<number>(0)

	const [data, setData] = useState({
		email: '',
		password: '',
		repeatPassword: '',
	})

	const { error } = useValidate(data)

	const handleForm = () => {
		if (stage === 0) {
			if (!error.email) {
				setStage(1)
			}
		}

		if (stage === 1) {
			if (!error.password && !error.repeatPassword) {
				navigate('/login')
			}
		}
	}

	return (
		<div className={styles.recover}>
			<Form>
				<h3 className={styles.formTitle}>Recover Password</h3>

				{stage === 0 && (
					<Field error={error.email as string}>
						<Input
							type='email'
							placeholder='Email'
							scale='md'
							onChange={e => setData({ ...data, email: e.target.value })}
						/>
					</Field>
				)}

				{stage === 1 && (
					<>
						<Field error={error.password as string}>
							<Input
								type='password'
								placeholder='Password'
								scale='md'
								onChange={e => setData({ ...data, password: e.target.value })}
							/>
						</Field>
						<Field error={error.repeatPassword as string}>
							<Input
								type='password'
								placeholder='Repeat Password'
								scale='md'
								onChange={e =>
									setData({ ...data, repeatPassword: e.target.value })
								}
							/>
						</Field>
					</>
				)}

				<Button type='button' onClick={() => handleForm()}>
					{stage === 0 ? 'Send Code' : 'Set Password'}
				</Button>
			</Form>
		</div>
	)
}
