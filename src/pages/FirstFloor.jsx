import React, { useState, useEffect, useRef } from 'react'
import { BiPencil } from 'react-icons/bi'
import { RxCross1 } from 'react-icons/rx'
import cn from 'clsx'
import ImagesCard from '../components/ImagesCard'
import { MdDone } from 'react-icons/md'

const FirstFloor = () => {
	const [greenPositions, setGreenPositions] = useState(
		JSON.parse(localStorage.getItem('greenPositions') || '[]')
	)

	const [bluePositions, setBluePositions] = useState(
		JSON.parse(localStorage.getItem('bluePositions') || '[]')
	)

	const [edit, setEdit] = useState(false)
	const [complete, setComplete] = useState(false)

	const [openImages, setOpenImages] = useState(
		JSON.parse(localStorage.getItem('openImages') || 'false')
	)

	const containerRef = useRef(null)

	const handleClick = event => {
		if (edit) {
			return
		}
		if (openImages) {
			return
		}

		const container = containerRef.current
		const containerRect = container.getBoundingClientRect()

		const x = ((event.clientX - containerRect.left) / containerRect.width) * 100
		const y = ((event.clientY - containerRect.top) / containerRect.height) * 100

		const isCloseToBlueButton = bluePositions.some(
			position =>
				Math.abs(position.left - x) < 1 && Math.abs(position.top - y) < 1
		)

		if (!isCloseToBlueButton) {
			if (complete) {
				setGreenPositions([...greenPositions, { left: x, top: y }])
			} else {
				setBluePositions([{ left: x, top: y }])
			}
		}
	}

	const handleDelete = (index, type) => {
		if (type === 'green') {
			const updatedPositions = greenPositions.filter((_, i) => i !== index)
			setGreenPositions(updatedPositions)
		} else {
			const updatedPositions = bluePositions.filter((_, i) => i !== index)
			setBluePositions(updatedPositions)
		}
	}

	useEffect(() => {
		localStorage.setItem('greenPositions', JSON.stringify(greenPositions))
	}, [greenPositions])

	useEffect(() => {
		localStorage.setItem('bluePositions', JSON.stringify(bluePositions))
	}, [bluePositions])

	useEffect(() => {
		localStorage.setItem('openImages', JSON.stringify(openImages))
	}, [openImages])

	const imgPath = '/images/plan1.jpg'

	return (
		<div className='relative'>
			<div>
				<button
					type='button'
					onClick={() => setComplete(!complete)}
					className={cn(
						'fixed z-50  p-6 rounded-full bottom-0 left-0 mb-24 m-3',
						complete ? ' bg-green text-grayLight' : 'bg-secondary'
					)}
				>
					<MdDone size={26} />
				</button>
				<button
					type='button'
					onClick={() => setEdit(!edit)}
					className={cn(
						'fixed z-50  p-6 rounded-full bottom-0 left-0 m-3',
						edit ? ' bg-red text-grayLight' : 'bg-secondary'
					)}
				>
					<BiPencil size={26} />
				</button>

				{edit && (
					<button
						type='button'
						className='fixed bottom-0 left-0 z-50 mb-24 bg-red  p-4 rounded-full text-grayLight'
						onClick={() => {
							setGreenPositions([])
							setBluePositions([])
							setEdit(false)
						}}
					>
						Clear all
					</button>
				)}
			</div>

			<div className='pt-12 flex justify-center' onClick={handleClick}>
				<div
					style={{ position: 'relative', maxWidth: '100%' }}
					ref={containerRef}
				>
					<img
						style={{ maxWidth: '100%' }}
						src={process.env.PUBLIC_URL + imgPath}
						alt='plan'
					/>
					{greenPositions.map((position, index) => (
						<button
							key={index}
							type='button'
							style={{
								position: 'absolute',
								left: `${position.left}%`,
								top: `${position.top}%`,
								backgroundColor: '#0ecd51',
								borderRadius: '100px'
							}}
							className='text-grayLight text-xl -mt-4 -ml-4 flex justify-center items-center px-2 py-2'
						>
							<MdDone />
							{edit && (
								<button
									key={index + 1}
									type='button'
									className='absolute z-40 t-0 r-0 bg-red -mt-4 -ml-5 p-4 rounded-full text-grayLight'
									style={{
										left: `${position.left}%`,
										top: `${position.top}%`
									}}
									onClick={() => handleDelete(index, 'green')}
								>
									<RxCross1 size={16} />
								</button>
							)}
						</button>
					))}
					{bluePositions.map((position, index) => (
						<button
							key={index}
							type='button'
							style={{
								position: 'absolute',
								left: `${position.left}%`,
								top: `${position.top}%`,
								backgroundColor: '#0e64cd',
								borderRadius: '100px'
							}}
							className='text-grayLight text-xl -mt-4 -ml-4 flex justify-center items-center px-2 py-px '
							onClick={!edit ? () => setOpenImages(!openImages) : ''}
						>
							+
							{edit && (
								<button
									key={index + 1}
									type='button'
									className='absolute z-40 t-0 r-0 bg-red -mt-4 -ml-5 p-4 rounded-full text-grayLight'
									style={{
										left: `${position.left}%`,
										top: `${position.top}%`
									}}
									onClick={() => handleDelete(index, 'blue')}
								>
									<RxCross1 size={16} />
								</button>
							)}
						</button>
					))}
				</div>
			</div>

			{openImages && <ImagesCard setOpenImages={setOpenImages} />}
		</div>
	)
}

export default FirstFloor
