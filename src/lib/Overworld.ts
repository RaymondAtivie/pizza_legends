import DirectionInput from './events/DirectionInput'
import OverworldMap from './OverworldMap'
import WorldMaps, { WorldMap, WorldMapType } from './utils/WorldMaps'

export type OverworldConfig = {
	element: HTMLElement | null
}

class Overworld {
	element: HTMLElement
	canvas: HTMLCanvasElement
	ctx: CanvasRenderingContext2D
	map: OverworldMap | null
	directionInput?: DirectionInput

	constructor(config: OverworldConfig) {
		if (config.element == null) throw new Error('Overworld element must not be null')

		console.log('Constructing overworld')

		this.element = config.element
		this.canvas = this.element.querySelector('canvas')!
		this.ctx = this.canvas.getContext('2d')!
		this.map = null
	}

	startGameLoop() {
		const step = () => {
			if (this.map) {
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

				//Draw Lower layer
				this.map.drawLowerImage(this.ctx)

				//Draw Game Objects
				Object.values(this.map.gameObjects).forEach((object) => {
					object.update({
						arrow: this.directionInput?.direction,
					})

					object.sprite.draw(this.ctx)
				})

				//Draw Upper layer
				this.map.drawUpperImage(this.ctx)
			}
			requestAnimationFrame(() => {
				step()
			})
		}

		step()
	}

	init() {
		const demoRoomMap = WorldMaps[WorldMapType.Kitchen]

		this.map = new OverworldMap(demoRoomMap)

		this.directionInput = new DirectionInput()
		this.directionInput.init()

		this.startGameLoop()
	}
}

export default Overworld
