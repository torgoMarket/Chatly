import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { Auth } from '../pages/Auth/Auth'
import { Home } from '../pages/Home/Home'

const AppRouter: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/auth' element={<Auth />} />
			</Routes>
		</Router>
	)
}

export default AppRouter
