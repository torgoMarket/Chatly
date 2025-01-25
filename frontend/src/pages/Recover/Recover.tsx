import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form } from '../../components/Form/Form'
import { Field } from '../../components/Layouts/Field/Field'
import { Button } from '../../components/UI/Button/Button'
import { Input } from '../../components/UI/Input/Input'
import { useValidate } from '../../hooks/useValidate'
import { checkCodeFromMail, sendMail } from '../../services/userService'
import styles from './Recover.module.scss'
export const Recover = () => {
	const navigate = useNavigate()
	const [stage, setStage] = useState<number>(0)

	const [recoverData, setRecoverData] = useState({
		email: '',
		code: '',
		password: '',
		repeatPassword: '',
	})

	const { error } = useValidate(recoverData)

	const handleForm = async () => {
		if (stage === 0) {
			if (!error.email) {
				const response = await sendMail(recoverData.email, 'Email verification')

				if (response?.status === 200) {
					setStage(1)
				}
			}
		}

		if (stage === 1) {
			if (!error.password && !error.repeatPassword) {
				const { email, password, code } = recoverData

				const response = await checkCodeFromMail({
					email,
					newPassword: password,
					code: Number(code),
				})

				if (response?.status === 200) {
					navigate('/login')
				}
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
							onChange={e =>
								setRecoverData({ ...recoverData, email: e.target.value })
							}
						/>
					</Field>
				)}

				{stage === 1 && (
					<>
						<Field error={error.email as string}>
							<Input
								type='number'
								placeholder='Code'
								scale='md'
								onChange={e =>
									setRecoverData({ ...recoverData, code: e.target.value })
								}
							/>
						</Field>
						<Field error={error.password as string}>
							<Input
								type='password'
								placeholder='Password'
								scale='md'
								onChange={e =>
									setRecoverData({ ...recoverData, password: e.target.value })
								}
							/>
						</Field>
						<Field error={error.repeatPassword as string}>
							<Input
								type='password'
								placeholder='Repeat Password'
								scale='md'
								onChange={e =>
									setRecoverData({
										...recoverData,
										repeatPassword: e.target.value,
									})
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
