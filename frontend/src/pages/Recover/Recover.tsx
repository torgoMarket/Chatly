import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form } from '../../components/Form/Form'
import { Field } from '../../components/Layouts/Field/Field'
import { Button } from '../../components/UI/Button/Button'
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
				<h3>Recover Password</h3>
				{stage === 0 && <Field label='email'></Field>}

				{stage === 1 && (
					<>
						<Field label='password'></Field>
						<Field label='repeat password'></Field>
					</>
				)}

				<Button type='button' onClick={() => handleClick()}>
					{stage === 0 ? 'Send Code' : 'Set Password'}
				</Button>
			</Form>
		</div>
	)
}
