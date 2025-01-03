import { Actionbar } from '../../components/Actionbar/Actionbar'
import { ChatList } from '../../components/ChatList/ChatList'
import { Container } from '../../components/Container/Container'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { BurgerBtn } from '../../components/UI/BurgerBtn/BurgerBtn'
import { useToggle } from '../../hooks/useToggle'

export const Dashboard = () => {
	const { isOpen: isSidebarOpen, toggle: toggleSidebar } = useToggle()

	return (
		<Container>
			<Sidebar isOpen={isSidebarOpen}>
				<ChatList />
			</Sidebar>
			<Actionbar>
				<BurgerBtn isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
			</Actionbar>
		</Container>
	)
}
