import { useCallback, useEffect, useState } from 'react'
import { Actionbar } from '../../components/Actionbar/Actionbar'
import { Chat } from '../../components/Chat/Chat'
import { ChatList } from '../../components/ChatList/ChatList'
import { Container } from '../../components/Container/Container'
import { CurrentChatUserInfo } from '../../components/Layouts/CurrentChatUserInfo/CurrentChatUserInfo'
import { DeviceControl } from '../../components/Layouts/DeviceControl/DeviceControl'
import { Field } from '../../components/Layouts/Field/Field'
import { Profile } from '../../components/Layouts/Profile/Profile'
import { TextBox } from '../../components/Layouts/TextBox/TextBox'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { BurgerBtn } from '../../components/UI/BurgerBtn/BurgerBtn'
import { Input } from '../../components/UI/Input/Input'
import { useGetUserInfo } from '../../hooks/queries/useGetUserInfo'
import { useCheckAuth } from '../../hooks/useCheckAuth'
import { useToggle } from '../../hooks/useToggle'
import { getChats } from '../../services/chatService'
import useSocketStore from '../../store/socketStore'
export const Dashboard = () => {
	useCheckAuth()

	const [search, setSearch] = useState<string>('')
	const [chatList, setChatList] = useState(null)

	const debounceSearch = useCallback(() => {
		const handleSearch = async () => {
			const response = await getChats(search)
			if (response?.status === 200) {
				setChatList(response.data)
			}

			if (response?.status === 400) {
				setChatList(user?.chats)
			}
		}

		const delayDebounceFn = setTimeout(() => {
			if (search) {
				handleSearch()
			} else {
				setChatList(user?.chats)
			}
		}, 1000)

		return () => clearTimeout(delayDebounceFn)
	}, [search])

	const currentChat = useSocketStore(state => state.currentChat)

	useEffect(() => {
		debounceSearch()
	}, [search, debounceSearch])

	const { isOpen: isSidebarOpen, toggle: toggleSidebar } = useToggle(true)
	const { user } = useGetUserInfo()

	return (
		<Container>
			<Actionbar>
				<BurgerBtn isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
				<CurrentChatUserInfo seen='' name={currentChat?.name} />
				<DeviceControl isMicOn={true} isHeadsetOn={true} />
			</Actionbar>

			<Sidebar isOpen={isSidebarOpen}>
				<Field className='p-4'>
					<Input
						placeholder='Search'
						scale='lg'
						onChange={e => setSearch(e.target.value)}
					/>
				</Field>

				<ChatList chatList={chatList} userId={user?.id} />
				<Profile
					color={user?.color?.Name}
					name={user?.name}
					nickname={user?.nickname}
				/>
			</Sidebar>
			<Chat userId={user?.id} />
			<TextBox userId={user?.id} />
		</Container>
	)
}
