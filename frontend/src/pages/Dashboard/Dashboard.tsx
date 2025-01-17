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
export const Dashboard = () => {
	useCheckAuth()

	const { isOpen: isSidebarOpen, toggle: toggleSidebar } = useToggle(true)
	const { user } = useGetUserInfo()

	return (
		<Container>
			<Actionbar>
				<BurgerBtn isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
				<CurrentChatUserInfo seen='12:20' name='Amir' />
				<DeviceControl isMicOn={true} isHeadsetOn={true} />
			</Actionbar>

			<Sidebar isOpen={isSidebarOpen}>
				<Field className='p-4'>
					<Input placeholder='Search' scale='lg' />
				</Field>

				<ChatList />
				<Profile avatar={user?.Color?.Name} name='Amir' tag='#amiryuld' />
			</Sidebar>
			<Chat />
			<TextBox />
		</Container>
	)
}
