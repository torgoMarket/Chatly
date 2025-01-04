import clsx from 'clsx'
import React from 'react'
import styles from './Sidebar.module.scss'

interface SidebarProps {
	children: React.ReactNode
	isOpen: boolean
}

export const Sidebar: React.FC<SidebarProps> = ({ children, isOpen }) => {
	return (
		<div className={clsx(!isOpen && '-translate-x-full', styles.sidebar)}>
			{children}
		</div>
	)
}
