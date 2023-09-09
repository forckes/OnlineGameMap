import React from 'react'
import { initialLinks } from '../components/AppBar/AppBar'
import HomeCard from '../components/HomeCard'

const Home = () => {
	return (
		<div
			style={{ height: 'calc(100vh)' }}
			className='flex justify-center items-center gap-10'
		>
			{initialLinks.map(link => (
				<HomeCard key={link.href} link={link} />
			))}
		</div>
	)
}

export default Home
