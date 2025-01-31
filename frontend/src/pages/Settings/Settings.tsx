import { ChevronLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from '../../components/Container/Container'
import { Field } from '../../components/Layouts/Field/Field'
import { Avatar } from '../../components/UI/Avatar/Avatar'
import { Button } from '../../components/UI/Button/Button'
import { Input } from '../../components/UI/Input/Input'
import { Select } from '../../components/UI/Select/Select'
import { useGetUserInfo } from '../../hooks/queries/useGetUserInfo'
import useAudioDevices from '../../hooks/useAudioDevices'
import { useCheckAuth } from '../../hooks/useCheckAuth'
import { useDebounce } from '../../hooks/useDebounce'
import { logoutUser, updateUser } from '../../services/userService'
import { TUser } from '../../types/userTypes'
import styles from './Settings.module.scss'

const settingsFields: Array<keyof TUser> = ['name', 'nickName', 'email']

export const Settings = () => {
	useCheckAuth()
	const navigate = useNavigate()

	const { user, refetchUserInfo } = useGetUserInfo()
	const [userData, setUserData] = useState<TUser>({} as TUser)

	const { audioInputDevices, audioOutputDevices } = useAudioDevices()

	const debouncedUser = useDebounce(userData, 500)

	useEffect(() => {
		const updateUserInfo = async () => {
			await updateUser(debouncedUser)
			refetchUserInfo()
		}

		if (Object.keys(user).length !== 0 && debouncedUser) {
			updateUserInfo()
		}
	}, [debouncedUser, user, refetchUserInfo])

	useEffect(() => {
		if (Object.keys(user).length !== 0) setUserData(user)
	}, [user])

	const logout = async () => {
		const response = await logoutUser(user.email)
		if (response && response.status === 200) {
			navigate('/login')
		}
	}

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
					<Avatar name={user.name} color={user.color} className='size-10' />
					<div className={styles.info}>
						<div className={styles.name}>{user.name}</div>
						<div className={styles.tag}>{user.nickName}</div>
					</div>
				</div>

				<div className={styles.settingList}>
					{settingsFields.map(settingField => (
						<div className={styles.settingListItem}>
							<div className={styles.title}>{settingField}</div>
							<Field>
								<Input
									placeholder={settingField}
									value={
										typeof userData[settingField] === 'boolean'
											? ''
											: (userData[settingField] as string | number) || ''
									}
									onChange={e =>
										setUserData({ ...userData, [settingField]: e.target.value })
									}
									disabled={settingField === 'email'}
								/>
							</Field>
						</div>
					))}

					<div className={styles.settingListItem}>
						<div className={styles.title}>Device Headset</div>
						<Select
							options={audioOutputDevices.map(device => ({
								value: device.deviceId,
								label: device.label || 'Unknown Device',
							}))}
							value={userData.device_hear || ''}
							onChange={e =>
								setUserData({
									...userData,
									device_hear: e.target.value,
								})
							}
						/>
					</div>

					<div className={styles.settingListItem}>
						<div className={styles.title}>Device Micro</div>
						<Select
							options={audioInputDevices.map(device => ({
								value: device.deviceId,
								label: device.label || 'Unknown Device',
							}))}
							value={userData.device_voice || ''}
							onChange={e =>
								setUserData({
									...userData,
									device_voice: e.target.value,
								})
							}
						/>
					</div>

					<Button className='bg-error text-white w-24 h-8' onClick={logout}>
						Logout
					</Button>
				</div>
			</Container>
		</div>
	)
}
