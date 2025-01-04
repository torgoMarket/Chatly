import avatar1 from '../../assets/images/avatar1.png'
import { Actionbar } from '../../components/Actionbar/Actionbar'
import { Chat } from '../../components/Chat/Chat'
import { ChatList } from '../../components/ChatList/ChatList'
import { Container } from '../../components/Container/Container'
import { Profile } from '../../components/Layouts/Profile/Profile'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { BurgerBtn } from '../../components/UI/BurgerBtn/BurgerBtn'
import { useToggle } from '../../hooks/useToggle'
export const Dashboard = () => {
	const { isOpen: isSidebarOpen, toggle: toggleSidebar } = useToggle(true)

	return (
		<Container>
			<Actionbar>
				<BurgerBtn isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
			</Actionbar>

			<Sidebar isOpen={isSidebarOpen}>
				<ChatList />
				<Profile avatar={avatar1} name='Amir' tag='#amiryuld' />
			</Sidebar>
			<Chat isSidebarOpen={isSidebarOpen} />
		</Container>
	)
}
