import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { Dashboard } from '../pages/Dashboard/Dashboard'
import { Home } from '../pages/Home/Home'
import { Login } from '../pages/Login/Login'
import { Recover } from '../pages/Recover/Recover'
import { Register } from '../pages/Register/Register'
import { Settings } from '../pages/Settings/Settings'
import { Test } from '../pages/Test'

const AppRouter: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/recover' element={<Recover />} />
				<Route path='/register' element={<Register />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/settings' element={<Settings />} />
				<Route path='/test' element={<Test />} />
			</Routes>
		</Router>
	)
}

export default AppRouter
