import React, { useState, useEffect } from 'react'
import rooms from '../db.json'
import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import { TbExchange } from 'react-icons/tb'

const ImagesCard = ({ setOpenImages }) => {
	const [value, setValue] = useState(
		localStorage.getItem('imageCardValue') || ''
	)
	const [roomComp, setRoomComp] = useState(
		JSON.parse(localStorage.getItem('roomComp')) || {}
	)
	const [selectedImageIndex, setSelectedImageIndex] = useState(0)
	const [change, setChange] = useState(true)

	const roomId = parseInt(value, 10)

	const handleSubmit = e => {
		try {
			e.preventDefault()
			const room = rooms.find(room => room.id === roomId)
			setRoomComp(room || {})
			setSelectedImageIndex(0)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		localStorage.setItem('roomComp', JSON.stringify(roomComp))
	}, [roomComp])

	useEffect(() => {
		localStorage.setItem('imageCardValue', value)
	}, [value])

	return (
		<ClickAwayListener onClickAway={() => setOpenImages(false)}>
			<div
				style={{
					minWidth: '1000px',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)'
				}}
				className='bg-secondary flex rounded-xl z-50 p-6 flex-col justify-center items-center absolute'
			>
				<form style={{ display: 'flex' }} onSubmit={handleSubmit}>
					<input
						value={value}
						onChange={e => setValue(e.target.value)}
						type='text'
						placeholder='Enter the room ID'
						className='pl-6 pr-2 text-xl mr-4 rounded-md '
					/>
					<button
						className=' bg-primary px-2 py-1 rounded-md text-grayLight'
						type='submit'
					>
						Find the room
					</button>
					<button
						onClick={() => setChange(!change)}
						className='ml-2'
						type='button'
					>
						<TbExchange size={28} />
					</button>
				</form>
				{roomComp && roomComp.images ? (
					<>
						{selectedImageIndex !== null && (
							<div className='py-2'>
								<img
									src={
										process.env.PUBLIC_URL +
										roomComp.images[selectedImageIndex].src
									}
									style={
										change
											? {
													maxWidth: '1200px',
													maxHeight: '600px',
													height: 'auto',
													width: 'auto'
											  }
											: {
													maxWidth: '1400px',
													maxHeight: '800px',
													height: 'auto',
													width: 'auto'
											  }
									}
									alt='Room'
									width='1000px'
									height='400px'
								/>
							</div>
						)}
						<div className='flex gap-1'>
							{roomComp.images.map((image, idx) => (
								<img
									key={image.id}
									src={process.env.PUBLIC_URL + image.src}
									alt='Room'
									style={{
										height: '100px',
										width: '100px'
									}}
									width='100px'
									height='100px'
									onClick={() => setSelectedImageIndex(idx)}
									className={
										selectedImageIndex === idx
											? 'border-2 cursor-pointer border-solid border-blue'
											: 'border-2 cursor-pointer border-solid border-grayLight'
									}
								/>
							))}
						</div>
					</>
				) : (
					<div>There are no images</div>
				)}
			</div>
		</ClickAwayListener>
	)
}

export default ImagesCard
