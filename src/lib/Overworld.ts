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
			// If a map is loaded
			if (this.map) {
				//Clearance if the canvas
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

				//Establish the camera person
				const cameraPerson = this.map.gameObjects.hero

				// Update objects positions in the map before drawing anything
				Object.values(this.map.gameObjects).forEach((object) => {
					object.update({
						arrow: this.directionInput?.direction,
						map: this.map,
					})
				})

				//Draw Lower layer
				this.map.drawLowerImage(this.ctx, cameraPerson)

				//Draw Game Objects
				Object.values(this.map.gameObjects).forEach((object) => {
					object.sprite.draw(this.ctx, cameraPerson)
				})

				//Draw Upper layer
				this.map.drawUpperImage(this.ctx, cameraPerson)
			}
			requestAnimationFrame(() => {
				step()
			})
		}

		step()
	}

	init() {
		const demoRoomMap = WorldMaps[WorldMapType.DemoRoom]

		this.map = new OverworldMap(demoRoomMap)
		console.log(this.map.walls)

		this.directionInput = new DirectionInput()
		this.directionInput.init()

		this.startGameLoop()
	}
}

export default Overworld
