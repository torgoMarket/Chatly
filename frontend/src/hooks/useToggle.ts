import { useState } from 'react'

export const useToggle = (initialState: boolean = false) => {
	const [isOpen, setIsOpen] = useState<boolean>(initialState)

	const toggle = (): void => setIsOpen(prev => !prev)

	return { isOpen, toggle }
}
