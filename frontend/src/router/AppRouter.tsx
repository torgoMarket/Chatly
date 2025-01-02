import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { Home } from '../pages/Home/Home'
import { Login } from '../pages/Login/Login'
import { Recover } from '../pages/Recover/Recover'
import { Register } from '../pages/Register/Register'

const AppRouter: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/recover' element={<Recover />} />
				<Route path='/register' element={<Register />} />
			</Routes>
		</Router>
	)
}

export default AppRouter
