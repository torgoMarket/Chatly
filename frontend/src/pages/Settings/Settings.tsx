import { ChevronLeft } from 'lucide-react'
import avatar1 from '../../assets/images/avatar1.png'
import { Container } from '../../components/Container/Container'
import { UpdateImage } from '../../components/Layouts/UpdateImage/UpdateImage'
import styles from './Settings.module.scss'
export const Settings = () => {
	return (
		<div className={styles.setting}>
			<Container>
				<header className={styles.header}>
					<ChevronLeft className={styles.backIcon} />
					<h1>Settings</h1>
				</header>
				<UpdateImage image={avatar1} />
				// Add component setting list
				<div>SettingList</div>
				// Add component setting Item
				<div>
					<div>name of setting</div>
					<select></select>
					//or
					<input type='text' />
				</div>
			</Container>
		</div>
	)
}
