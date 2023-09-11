import AllData from 'components/AllData'
import React from 'react'
import { initialLinks } from '../components/AppBar/AppBar'
import HomeCard from '../components/HomeCard'

const Home = () => {
	return (
		<div className='pt-16 flex flex-col items-center'>
			<div className='flex gap-10'>
				{initialLinks.map(link => (
					<HomeCard key={link.href} link={link} />
				))}
			</div>
			<AllData />
		</div>
	)
}

export default Home
