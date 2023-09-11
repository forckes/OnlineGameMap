import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import FirstFloor from '../pages/FirstFloor'
import Home from '../pages/Home'
import Layout from './Layout/Layout'

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Navigate to='home' />}></Route>
				<Route path='home' element={<Home />}></Route>
				<Route path='1floor' element={<FirstFloor />}></Route>
				<Route
					path='2floor'
					element={<div>Sorry, it's not ready yet :(</div>}
				></Route>
				<Route
					path='3floor'
					element={<div>Sorry, it's not ready yet :(</div>}
				></Route>
				<Route
					path='basement'
					element={<div>Sorry, it's not ready yet :(</div>}
				></Route>
			</Route>
		</Routes>
	)
}

export default App
