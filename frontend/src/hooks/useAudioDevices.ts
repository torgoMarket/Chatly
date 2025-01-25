import { useEffect, useState } from 'react'

const useAudioDevices = () => {
	const [audioInputDevices, setAudioInputDevices] = useState<MediaDeviceInfo[]>(
		[]
	)
	const [audioOutputDevices, setAudioOutputDevices] = useState<
		MediaDeviceInfo[]
	>([])

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

	return { audioInputDevices, audioOutputDevices }
}

export default useAudioDevices
