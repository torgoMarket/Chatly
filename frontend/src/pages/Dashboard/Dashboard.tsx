import { AlignJustify, X } from 'lucide-react'
import { Actionbar } from '../../components/Actionbar/Actionbar'
import { ChatList } from '../../components/ChatList/ChatList'
import { Container } from '../../components/Container/Container'
import { Sidebar } from '../../components/Sidebar/Sidebar'

import { useState } from 'react'
import styles from './Dashboard.module.scss'

export const Dashboard = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	return (
		<Container>
			<Sidebar isOpen={isSidebarOpen}>
				<ChatList />
			</Sidebar>
			<Actionbar>
				{isSidebarOpen ? (
					<X
						className={styles.burgerBtn}
						onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					/>
				) : (
					<AlignJustify
						className={styles.burgerBtn}
						onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					/>
				)}
			</Actionbar>
		</Container>
	)
}
