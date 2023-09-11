import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import cn from 'clsx'
import { AiFillHome } from 'react-icons/ai'

export const initialLinks = [
	{ href: '1floor', name: '1 Floor' },
	{ href: '2floor', name: '2 Floor(-)' },
	{ href: '3floor', name: '3 Floor(-)' },
	{ href: 'basement', name: 'Basement(-)' }
]

export default function AppBar() {
	const location = useLocation()

	return (
		<header className='flex z-50 justify-center fixed bg-primary w-screen'>
			<nav className=' flex gap-20 mr-20 text-2xl py-2 text-secondary'>
				<NavLink
					className={cn(
						'flex gap-2',
						location.pathname === `/home`
							? 'font-semibold underline'
							: 'font-semibold'
					)}
					to='/'
				>
					<AiFillHome size={26} /> Home
				</NavLink>
				<div className='flex gap-8'>
					{initialLinks.map(({ href, name }) => (
						<NavLink
							className={cn(
								location.pathname === `/${href}`
									? 'font-semibold underline'
									: 'font-semibold'
							)}
							key={href}
							to={href}
						>
							{name}
						</NavLink>
					))}
				</div>
			</nav>
		</header>
	)
}
