import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const HomeCard = ({ link }) => {
	return (
		<div className='flex flex-col	 justify-end bg-gray rounded-md'>
			<Link className='hover:p-2 transition-all' to={`/${link.href}`}>
				<div className='text-2xl p-16 pb-10 font-semibold'>{link.name}</div>

				<div className='flex justify-end mr-4 mb-2'>
					<BsArrowRight size={28} />
				</div>
			</Link>
		</div>
	)
}

export default HomeCard
