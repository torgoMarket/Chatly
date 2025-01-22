import axios from 'axios'
import { useEffect, useState } from 'react'
import { useGetUserInfo } from '../hooks/queries/useGetUserInfo'

export const Test = () => {
	const [messages, setMessages] = useState([])

	const { user } = useGetUserInfo()
	console.log('user', user)

	const [conn, setConn] = useState(null)

	useEffect(() => {
		if (user) {
			const ws = new WebSocket(
				`ws://localhost:3000/ws/joinroom?roomid=2&userid=${user?.id}&username=${
					user?.id === 43 ? 'Amir12' : 'Amir12345'
				}`
			)
			setConn(ws)

			ws.onmessage = event => {
				const messageData = JSON.parse(event.data)
				console.log('Received message:', messageData)
				// You can process or display the message as needed
			}
		}
	}, [user])

	// Handle Logout request
	const logout = async () => {
		try {
			const response = await axios.post(
				'http://localhost:3000/logout',
				{
					Email: 'amiryuld@gmail.com',
				},
				{
					withCredentials: true,
				}
			)
			console.log('Logout response:', response)
		} catch (error) {
			console.error('Error during logout:', error)
		}
	}

	// Handle EnterCode request
	const EnterCode = async () => {
		try {
			const response = await axios.post('http://localhost:3000/vermail', {
				Code: 9356,
				Email: 'amir1008047@gmail.com',
			})
			console.log('EnterCode response:', response)
		} catch (error) {
			console.error('Error entering code:', error)
		}
	}

	// Send message to WebSocket server
	const SendMessage = () => {
		const message = 'Hello, Server!'
		conn.send('message')
		console.log('Message sent:', message)
	}

	// Get all messages from the state
	const GetAllMessages = () => {
		console.log('All messages:', messages)
	}

	// Perform a test GET request
	const test = async () => {
		try {
			const response = await axios.get('http://localhost:3000/val', {
				withCredentials: true,
			})
			console.log('Test response:', response)
		} catch (error) {
			console.error('Error during test:', error)
		}
	}

	// Create a room via API
	const createRoom = async () => {
		try {
			const response = await axios.post(
				'http://localhost:3000/ws/createroom',
				{
					ID: '2',
					Name: 'Amir',
				},
				{
					withCredentials: true,
				}
			)
			console.log('Create room response:', response)
		} catch (error) {
			console.error('Error creating room:', error)
		}
	}

	// Join a room via API
	const joinRoom = async () => {
		try {
			const response = await axios.post('http://localhost:3000/getuser', {
				NickName: 'Amir12345',
			})
			console.log('Get rooms response:', response)
		} catch (error) {
			console.error('Error fetching rooms:', error)
		}
	}

	// Get all rooms via API
	const getRooms = async () => {
		try {
			const response = await axios.get('http://localhost:3000/ws/getrooms', {
				withCredentials: true,
			})
			console.log('Get rooms response:', response)
		} catch (error) {
			console.error('Error fetching rooms:', error)
		}
	}

	return (
		<div className='flex flex-col gap-10 p-20'>
			<button
				className='w-60 h-12 bg-amber-200 text-black rounded-xl'
				onClick={EnterCode}
			>
				Enter Code
			</button>
			<button
				className='w-60 h-12 bg-amber-200 text-black rounded-xl'
				onClick={SendMessage}
			>
				Send Message
			</button>
			<button
				className='w-60 h-12 bg-amber-200 text-black rounded-xl'
				onClick={GetAllMessages}
			>
				Get All Messages
			</button>
			<button
				className='w-60 h-12 bg-amber-200 text-black rounded-xl'
				onClick={test}
			>
				Test
			</button>
			<button
				className='w-60 h-12 bg-amber-200 text-black rounded-xl'
				onClick={logout}
			>
				Logout
			</button>
			<button
				className='w-60 h-12 bg-amber-200 text-black rounded-xl'
				onClick={createRoom}
			>
				Create Room
			</button>
			<button
				className='w-60 h-12 bg-amber-200 text-black rounded-xl'
				onClick={getRooms}
			>
				Get Rooms
			</button>
			<button
				className='w-60 h-12 bg-amber-200 text-black rounded-xl'
				onClick={joinRoom}
			>
				Join Room
			</button>

			{/* Displaying received messages */}
			<div className='flex flex-col gap-4'>
				<ul>
					{messages.map((msg, index) => (
						<li key={index}>{msg}</li>
					))}
				</ul>
			</div>
		</div>
	)
}
