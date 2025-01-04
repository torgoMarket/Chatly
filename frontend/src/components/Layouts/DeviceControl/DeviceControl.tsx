import clsx from 'clsx'
import { HeadphoneOff, Headset, Mic, MicOff } from 'lucide-react'
import { useState } from 'react'
import styles from './DeviceControl.module.scss'

interface DeviceControlProps {
	isMicOn: boolean
	isHeadsetOn: boolean
}

export const DeviceControl: React.FC<DeviceControlProps> = ({
	isMicOn,
	isHeadsetOn,
}) => {
	const [isDevicesOn, toggleDevices] = useState<DeviceControlProps>({
		isMicOn,
		isHeadsetOn,
	})

	return (
		<div className={styles.deviceControl}>
			{isDevicesOn.isHeadsetOn ? (
				<Headset
					onClick={() => toggleDevices({ ...isDevicesOn, isHeadsetOn: false })}
					className={clsx(styles.deviceIcon, styles.deviceOn)}
				/>
			) : (
				<HeadphoneOff
					onClick={() => toggleDevices({ ...isDevicesOn, isHeadsetOn: true })}
					className={clsx(styles.deviceIcon, styles.deviceOff)}
				/>
			)}
			{isDevicesOn.isMicOn ? (
				<Mic
					className={clsx(styles.deviceIcon, styles.deviceOn)}
					onClick={() => toggleDevices({ ...isDevicesOn, isMicOn: false })}
				/>
			) : (
				<MicOff
					className={clsx(styles.deviceIcon, styles.deviceOff)}
					onClick={() => toggleDevices({ ...isDevicesOn, isMicOn: true })}
				/>
			)}
		</div>
	)
}
