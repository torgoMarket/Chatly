import clsx from 'clsx'
import { Check, CheckCheck } from 'lucide-react'
import styles from './Message.module.scss'

interface MessageProps {
	variant: 'received' | 'sent'
	checked: boolean
	time: string
	text: string
}

export const Message: React.FC<MessageProps> = ({
	variant,
	checked,
	time,
	text,
}) => {
	return (
		<div className={clsx(styles.message, styles[variant])}>
			<div className={styles.text}>{text}</div>
			<div className={styles.info}>
				<div className={styles.time}>{time}</div>
				{variant === 'sent' &&
					(checked ? (
						<CheckCheck className={styles.checked} />
					) : (
						<Check className={styles.checked} />
					))}
			</div>
		</div>
	)
}
