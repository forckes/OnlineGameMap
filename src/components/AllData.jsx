import React, { useState } from 'react'
import rooms from '../db.json'
import { ClickAwayListener } from '@mui/base/ClickAwayListener'

const AllData = () => {
	const [openImage, setOpenImage] = useState(null)

	const handleImageClick = imageSrc => {
		setOpenImage(imageSrc)
	}

	const closeImage = () => {
		setOpenImage(null)
	}

	return (
		<div className='mt-10 flex  flex-col  w-full'>
			<div className='text-5xl flex justify-center font-semibold mb-5'>
				All existing data
			</div>
			<div className='flex-col ml-6 justify-start flex'>
				{rooms.map((room, index) => (
					<div key={index} className='flex  mb-4 items-center gap-2'>
						<div className='text-4xl mr-10 font-semibold'>
							ID code: {room.id}
						</div>
						<div className='flex items-center gap-px'>
							{room.images.map((image, imageIndex) => (
								<div key={imageIndex} className='relative'>
									<img
										style={{
											maxWidth: '500px',
											maxHeight: '400px',
											height: 'auto',
											width: 'auto'
										}}
										src={process.env.PUBLIC_URL + image.src}
										alt='Room'
										onClick={() => handleImageClick(image.src)}
									/>
									{openImage === image.src && (
										<ClickAwayListener onClickAway={() => closeImage()}>
											<div
												onClick={closeImage}
												style={{
													top: '50%',
													left: '50%',
													transform: 'translate(-50%, -50%)',
													position: 'fixed',
													backgroundColor: 'rgba(0, 0, 0, 0.438)',
													zIndex: 1000,
													paddingLeft: '20px',
													paddingRight: '20px'
												}}
											>
												<img
													style={{
														maxWidth: '1400px',
														maxHeight: '800px',
														display: 'block',
														margin: '0 auto'
													}}
													src={process.env.PUBLIC_URL + image.src}
													alt='Room'
												/>
											</div>
										</ClickAwayListener>
									)}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default AllData
