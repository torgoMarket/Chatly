import { useState } from 'react'

export const useToggle = (initialState: boolean = false) => {
	const [state, setState] = useState<boolean>(initialState)

	const toggle = (): void => setState(prev => !prev)

	return { state, toggle }
}
