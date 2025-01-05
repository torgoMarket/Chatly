import avatar1 from '../../assets/images/avatar1.png'
import { Actionbar } from '../../components/Actionbar/Actionbar'
import { Chat } from '../../components/Chat/Chat'
import { ChatList } from '../../components/ChatList/ChatList'
import { Container } from '../../components/Container/Container'
import { CurrentChatUserInfo } from '../../components/Layouts/CurrentChatUserInfo/CurrentChatUserInfo'
import { DeviceControl } from '../../components/Layouts/DeviceControl/DeviceControl'
import { Field } from '../../components/Layouts/Field/Field'
import { Profile } from '../../components/Layouts/Profile/Profile'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { BurgerBtn } from '../../components/UI/BurgerBtn/BurgerBtn'
import { Input } from '../../components/UI/Input/Input'
import { useToggle } from '../../hooks/useToggle'
export const Dashboard = () => {
	const { isOpen: isSidebarOpen, toggle: toggleSidebar } = useToggle(true)

	return (
		<Container>
			<Actionbar>
				<BurgerBtn isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
				<CurrentChatUserInfo seen='12:20' name='Amir' />
				<DeviceControl isMicOn={true} isHeadsetOn={true} />
			</Actionbar>

			<Sidebar isOpen={isSidebarOpen}>
				<Field>
					<Input placeholder='Search' scale='lg' className='my-4' />
				</Field>

				<ChatList />
				<Profile avatar={avatar1} name='Amir' tag='#amiryuld' />
			</Sidebar>
			<Chat />
		</Container>
	)
}
