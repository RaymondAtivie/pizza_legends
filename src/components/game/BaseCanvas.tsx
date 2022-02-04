import { useEffect } from 'react'
import Overworld from '~/lib/Overworld'
import GameObject from './GameObject'

const BaseCanvas = () => {
	useEffect(() => {
		const overworld = new Overworld({
			element: document.querySelector('.game-container'),
		})

		overworld.init()
	}, [])

	const width = 704 / 2
	const height = 396 / 2

	return (
		<div className="flex items-center justify-center h-full ">
			<div className="relative game-container scale-[4]" style={{ height: height + 'px', width: width + 'px' }}>
				<canvas className="border bg-blue-50 game-canvas" width={width} height={height}></canvas>
			</div>
			{/* <GameObject ctx={overworld.ctx} image="./assets/characters/people/hero.png" x={4} y={4} /> */}
		</div>
	)
}

export default BaseCanvas
