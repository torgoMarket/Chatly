import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form } from '../../components/Form/Form'
import { Field } from '../../components/Layouts/Field/Field'
import { Button } from '../../components/UI/Button/Button'
import { Input } from '../../components/UI/Input/Input'
import styles from './Recover.module.scss'
export const Recover = () => {
	const navigate = useNavigate()
	const [stage, setStage] = useState<number>(0)

	const handleClick = () => {
		if (stage === 0) {
			setStage(1)
		} else {
			navigate('/login')
		}
	}

	return (
		<div className={styles.recover}>
			<Form>
				<h3 className={styles.formTitle}>Recover Password</h3>

				{stage === 0 && (
					<Field label='email'>
						<Input type='email' placeholder='Email' scale='md' />
					</Field>
				)}

				{stage === 1 && (
					<>
						<Field label='password'>
							<Input type='password' placeholder='Password' scale='md' />
						</Field>
						<Field label='repeat password'>
							<Input type='password' placeholder='Repeat Password' scale='md' />
						</Field>
					</>
				)}

				<Button type='button' onClick={() => handleClick()}>
					{stage === 0 ? 'Send Code' : 'Set Password'}
				</Button>
			</Form>
		</div>
	)
}
