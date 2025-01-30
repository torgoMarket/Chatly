import clsx from 'clsx'
import styles from './Avatar.module.scss'

export const Avatar = ({
	name,
	className,
	...props
}: {
	name: string
	className: string
}) => {
	return (
		<div className='h-full justify-center items-center flex'>
			<div className={clsx(styles.avatar, className)} {...props}>
				{name && name[0]}
			</div>
		</div>
	)
}
