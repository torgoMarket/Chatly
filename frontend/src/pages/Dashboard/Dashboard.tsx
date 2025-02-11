import { Actionbar } from '../../components/Actionbar/Actionbar'
import { Chat } from '../../components/Chat/Chat'
import { ChatList } from '../../components/ChatList/ChatList'
import { Container } from '../../components/Container/Container'
import { CurrentChatUserInfo } from '../../components/Layouts/CurrentChatUserInfo/CurrentChatUserInfo'

import { Field } from '../../components/Layouts/Field/Field'
import { Profile } from '../../components/Layouts/Profile/Profile'
import { TextBox } from '../../components/Layouts/TextBox/TextBox'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { BurgerBtn } from '../../components/UI/BurgerBtn/BurgerBtn'
import { Input } from '../../components/UI/Input/Input'
import { ThemeSelector } from '../../components/UI/ThemeSelector/ThemeSelector'
import { useGetUserInfo } from '../../hooks/queries/useGetUserInfo'
import { useCheckAuth } from '../../hooks/useCheckAuth'
import { useSearchChat } from '../../hooks/useSearchChat'
import { useToggle } from '../../hooks/useToggle'
import useCurrentChatStore from '../../store/currentChatStore'

export const Dashboard = () => {
	useCheckAuth()

	const { user } = useGetUserInfo()
	const { state: isSidebarOpen, toggle: toggleSidebar } = useToggle(true)
	const { search, setSearch, results: searchedChatList } = useSearchChat(1000)
	const currentChat = useCurrentChatStore(state => state.currentChatInfo)

	return (
		<Container>
			<Actionbar>
				<BurgerBtn isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
				<CurrentChatUserInfo />
				<ThemeSelector />
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
					toggleSidebar={toggleSidebar}
				/>
				<Profile
					color={user?.color}
					name={user?.name}
					nickname={user?.nickName}
				/>
			</Sidebar>
			{currentChat && (
				<>
					<Chat loggedUserId={user?.id} />
					<TextBox />
				</>
			)}
		</Container>
	)
}
