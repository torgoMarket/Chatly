import { Settings } from 'lucide-react'

import styles from './Profile.module.scss'

interface ProfileProps {
	name: string
	tag: string
	avatar: string
}

export const Profile: React.FC<ProfileProps> = ({ name, avatar, tag }) => {
	return (
		<div className={styles.profile}>
			<div className={styles.avatar}>
				<img src={avatar} alt='Avatar' />
			</div>
			<div className={styles.info}>
				<div className={styles.name}>
					{name && name.slice(0, 12)} {name && name.length > 12 && '...'}
				</div>
				<div className={styles.tag}>{tag}</div>
			</div>
			<div className={styles.setting}>
				<Settings />
			</div>
		</div>
	)
}
