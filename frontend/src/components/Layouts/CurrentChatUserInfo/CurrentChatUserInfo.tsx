import avatar1 from '../../../assets/images/avatar1.png'
import styles from './CurrentChatUserInfo.module.scss'

interface CurrentChatUserInfoProps {
	name: string
	seen: string
}

export const CurrentChatUserInfo: React.FC<CurrentChatUserInfoProps> = ({
	name,
	seen,
}) => {
	return (
		<div className={styles.currentChatUserInfo}>
			<img src={avatar1} alt='avatar' />
			<div className={styles.info}>
				<h3 className={styles.name}>John Doe</h3>
				<p className={styles.seen}>3m ago</p>
			</div>
		</div>
	)
}
