import useCurrentChatStore from '../../../store/currentChatStore'
import { Avatar } from '../../UI/Avatar/Avatar'
import styles from './CurrentChatUserInfo.module.scss'

export const CurrentChatUserInfo = () => {
	const currentChatInfo = useCurrentChatStore(state => state.currentChatInfo)

	return (
		<div className={styles.currentChatUserInfo}>
			<Avatar name='Amir' style={{ backgroundColor: currentChatInfo?.color }} />
			<div className={styles.info}>
				<h3 className={styles.name}>{currentChatInfo?.name}</h3>
				{/* <p className={styles.seen}>{currentChatInfo}</p> */}
			</div>
		</div>
	)
}
