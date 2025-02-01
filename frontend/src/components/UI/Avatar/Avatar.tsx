import clsx from 'clsx'
import styles from './Avatar.module.scss'

export const Avatar = ({
	name,
	color,
	className,
	...props
}: {
	name: string
	color: string
	className?: string
}) => {
	return (
		<div className='h-full justify-center items-center flex'>
			<div
				className={clsx(styles.avatar, className)}
				style={{ background: color }}
				{...props}
			>
				{name && name[0]}
			</div>
		</div>
	)
}
