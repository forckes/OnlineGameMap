import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import AppBar from '../AppBar/AppBar'

export default function Layout() {
	return (
		<div>
			<AppBar />
			<div className='px-2'>
				<Suspense fallback={null}>
					<Outlet />
				</Suspense>
			</div>
		</div>
	)
}
