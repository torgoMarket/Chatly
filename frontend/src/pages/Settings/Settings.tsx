import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import avatar1 from '../../assets/images/avatar1.png'
import { Container } from '../../components/Container/Container'
import { Field } from '../../components/Layouts/Field/Field'
import { UpdateImage } from '../../components/Layouts/UpdateImage/UpdateImage'
import { Input } from '../../components/UI/Input/Input'
import { Select } from '../../components/UI/Select/Select'
import styles from './Settings.module.scss'
export const Settings = () => {
	const navigate = useNavigate()

	return (
		<div className={styles.setting}>
			<Container>
				<header className={styles.header}>
					<ChevronLeft
						onClick={() => navigate('/dashboard')}
						className={styles.backIcon}
					/>
					<h1 className={styles.heading}>Settings</h1>
				</header>

				<div className={styles.wrapper}>
					<UpdateImage image={avatar1} />

					<div className={styles.info}>
						<div className={styles.name}>Amir</div>
						<div className={styles.tag}>#7777</div>
					</div>
				</div>

				<div className={styles.settingList}>
					<div className={styles.settingListItem}>
						<div className={styles.title}>Name</div>
						<Field>
							<Input placeholder='Name' />
						</Field>
					</div>

					<div className={styles.settingListItem}>
						<div className={styles.title}>Password</div>
						<Field>
							<Input placeholder='Password' />
						</Field>
					</div>

					<div className={styles.settingListItem}>
						<div className={styles.title}>Email</div>
						<Field>
							<Input placeholder='Email' />
						</Field>
					</div>

					<div className={styles.settingListItem}>
						<div className={styles.title}>Theme</div>
						<Select options={['light', 'dark']} value='dark' />
					</div>

					<div className={styles.settingListItem}>
						<div className={styles.title}>Device Headset</div>
						<Select options={['device1', 'device2']} value='device1' />
					</div>

					<div className={styles.settingListItem}>
						<div className={styles.title}>Device Micro</div>
						<Select options={['device1', 'device2']} value='device1' />
					</div>
				</div>
			</Container>
		</div>
	)
}
