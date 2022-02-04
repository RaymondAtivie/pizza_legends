import { useEffect } from 'react'
import Overworld from '~/lib/Overworld'

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
		<div className="sbg-amber-200 flex h-full items-center justify-center bg-purple-200">
			<div
				className="game-container relative flex scale-[4] items-center justify-center bg-purple-200"
				style={{ height: height + 0 + 'px', width: width + 0 + 'px' }}
			>
				<canvas className="game-canvas bg-blue-50" width={width} height={height}></canvas>
			</div>
			{/* <GameObject ctx={overworld.ctx} image="./assets/characters/people/hero.png" x={4} y={4} /> */}
		</div>
	)
}

export default BaseCanvas
