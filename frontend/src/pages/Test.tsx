import { useRef, useState } from 'react'

export const Test = () => {
	const [isRecording, setIsRecording] = useState(false)
	const [audioUrl, setAudioUrl] = useState<string | null>(null)
	const mediaRecorderRef = useRef<MediaRecorder | null>(null)

	// Start recording
	const startRecording = async () => {
		try {
			// Request permission to use the microphone
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
			const mediaRecorder = new MediaRecorder(stream)
			mediaRecorderRef.current = mediaRecorder

			const audioChunks: BlobPart[] = []

			// Collect audio data chunks
			mediaRecorder.ondataavailable = event => {
				audioChunks.push(event.data)
			}

			// When recording stops, create a Blob and an audio URL
			mediaRecorder.onstop = () => {
				const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
				const audioURL = URL.createObjectURL(audioBlob)
				setAudioUrl(audioURL)
			}

			mediaRecorder.start()
			setIsRecording(true)
		} catch (error) {
			console.error('Error accessing microphone:', error)
		}
	}

	// Stop recording
	const stopRecording = () => {
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current.stop()
			setIsRecording(false)
		}
	}

	return (
		<div>
			<h1>Microphone Test</h1>

			{/* Recording Buttons */}
			<div>
				{!isRecording ? (
					<button onClick={startRecording}>Start Recording</button>
				) : (
					<button onClick={stopRecording}>Stop Recording</button>
				)}
			</div>

			{/* Playback Section */}
			{audioUrl && (
				<div>
					<h2>Playback</h2>
					<audio src={audioUrl} controls />
				</div>
			)}
		</div>
	)
}
