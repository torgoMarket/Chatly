import { Settings } from 'lucide-react'

import { useNavigate } from 'react-router-dom'
import { Avatar } from '../../UI/Avatar/Avatar'
import styles from './Profile.module.scss'

interface ProfileProps {
	name: string
	nickname: string
	color: string
}

export const Profile: React.FC<ProfileProps> = ({ name, color, nickname }) => {
	const navigate = useNavigate()

	return (
		<div className={styles.profile}>
			<Avatar name={name} color={color} />
			<div className={styles.info}>
				<div className={styles.name}>
					{name && name.slice(0, 12)} {name && name.length > 12 && '...'}
				</div>
				<div className={styles.tag}>{nickname && nickname}</div>
			</div>
			<div className={styles.setting}>
				<Settings onClick={() => navigate('/settings')} />
			</div>
		</div>
	)
}
