import { ChevronLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from '../../components/Container/Container'
import { Field } from '../../components/Layouts/Field/Field'
import { Button } from '../../components/UI/Button/Button'
import { Input } from '../../components/UI/Input/Input'
import { Select } from '../../components/UI/Select/Select'
import { useGetUserInfo } from '../../hooks/queries/useGetUserInfo'
import { useCheckAuth } from '../../hooks/useCheckAuth'
import { useDebounce } from '../../hooks/useDebounce'
import { logoutUser, updateUser } from '../../services/userService'
import { TUser } from '../../types/userTypes'
import styles from './Settings.module.scss'

export const Settings = () => {
	useCheckAuth()
	const navigate = useNavigate()
	const { user, refetchUserInfo } = useGetUserInfo()
	const [userData, setUserData] = useState<TUser>({} as TUser)
	const [audioInputDevices, setAudioInputDevices] = useState<MediaDeviceInfo[]>(
		[]
	)
	const [audioOutputDevices, setAudioOutputDevices] = useState<
		MediaDeviceInfo[]
	>([])
	const debouncedUser = useDebounce(userData, 500)

	useEffect(() => {
		const requestPermissionsAndFetchDevices = async () => {
			try {
				await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
				const devices = await navigator.mediaDevices.enumerateDevices()
				setAudioInputDevices(
					devices.filter(device => device.kind === 'audioinput')
				)
				setAudioOutputDevices(
					devices.filter(device => device.kind === 'audiooutput')
				)
			} catch (error) {
				console.error('Error accessing media devices:', error)
			}
		}

		requestPermissionsAndFetchDevices()
	}, [])

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
					<div className={styles.info}>
						<div className={styles.name}>{user.name}</div>
						<div className={styles.tag}>{user.nickName}</div>
					</div>
				</div>

				<div className={styles.settingList}>
					<div className={styles.settingListItem}>
						<div className={styles.title}>Email</div>
						<Field>
							<div className='text-text'>{user.email}</div>
						</Field>
					</div>

					<div className={styles.settingListItem}>
						<div className={styles.title}>Name</div>
						<Field>
							<Input
								placeholder='Name'
								value={userData.name || ''}
								onChange={e =>
									setUserData({ ...userData, name: e.target.value })
								}
							/>
						</Field>
					</div>

					<div className={styles.settingListItem}>
						<div className={styles.title}>Nickname</div>
						<Field>
							<Input
								placeholder='Nickname'
								value={userData.nickName || ''}
								onChange={e =>
									setUserData({ ...userData, nickName: e.target.value })
								}
							/>
						</Field>
					</div>

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

					<Button
						className='bg-error text-white w-24 h-8'
						onClick={logout}
						type='button'
					>
						Logout
					</Button>
				</div>
			</Container>
		</div>
	)
}
