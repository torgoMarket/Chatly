import React from 'react'

import clsx from 'clsx'
import styles from './UpdateImage.module.scss'

interface UpdateImageProps {
	image: string | null
	className?: string
}

export const UpdateImage: React.FC<UpdateImageProps> = ({
	image,
	className,
}) => {
	const [currentImage, setCurrentImage] = React.useState<string | null>(image)

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setCurrentImage(reader.result as string)
			}
			reader.readAsDataURL(file)
		}
	}

	return (
		<div className={clsx(styles.updateImage, className)}>
			<label htmlFor='imageUpload'>
				{currentImage ? (
					<img
						src={currentImage ? currentImage : 'default-avatar.png'}
						alt='Avatar'
						style={{ width: '100px', height: '100px', cursor: 'pointer' }}
					/>
				) : (
					<div className={styles.defaultImage}></div>
				)}
			</label>
			<input
				id='imageUpload'
				className={styles.imageUpload}
				type='file'
				accept='image/*'
				onChange={handleImageChange}
			/>
		</div>
	)
}
