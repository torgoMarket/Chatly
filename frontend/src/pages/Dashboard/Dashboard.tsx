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
import { useSearchChat } from '../../hooks/useSearchChat'
import { useToggle } from '../../hooks/useToggle'

export const Dashboard = () => {
	useCheckAuth()

	const { user } = useGetUserInfo()
	const { state: isSidebarOpen, toggle: toggleSidebar } = useToggle(true)
	const { search, setSearch, results: searchedChatList } = useSearchChat(1000)

	return (
		<Container>
			<Actionbar>
				<BurgerBtn isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
				<CurrentChatUserInfo />
				<DeviceControl isMicOn={true} isHeadsetOn={true} />
			</Actionbar>

			<Sidebar isOpen={isSidebarOpen}>
				<Field className='p-4'>
					<Input
						placeholder='Search'
						scale='lg'
						value={search}
						onChange={e => setSearch(e.target.value)}
					/>
				</Field>

				<ChatList
					loggedUserId={user?.id}
					loggedUserName={user?.name}
					searchedChatList={searchedChatList}
				/>
				<Profile
					color={user?.color}
					name={user?.name}
					nickname={user?.nickName}
				/>
			</Sidebar>
			<Chat loggedUserId={user?.id} />
			<TextBox />
		</Container>
	)
}
