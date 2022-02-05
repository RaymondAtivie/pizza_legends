import GameObject, { MovementDirection } from './objects/GameObject'
import utils from './utils/utils'
import { WallCoord } from './utils/WorldMaps'

type OverworldMapConfig = {
	gameObjects: Record<string, GameObject>
	lowerSrc: string
	upperSrc: string
	walls?: WallCoord
}

class OverworldMap {
	gameObjects: Record<string, GameObject>
	lowerImage: HTMLImageElement
	upperImage: HTMLImageElement
	walls: WallCoord

	constructor(config: OverworldMapConfig) {
		this.gameObjects = config.gameObjects || {}

		this.walls = config.walls || {}

		this.lowerImage = new Image()
		this.lowerImage.src = config.lowerSrc

		this.upperImage = new Image()
		this.upperImage.src = config.upperSrc || ''
	}

	drawLowerImage(ctx: CanvasRenderingContext2D, cameraPerson: GameObject): void {
		ctx.drawImage(
			this.lowerImage,
			utils.withGrid(utils.xCameraNudge) - cameraPerson.x,
			utils.withGrid(utils.yCameraNudge) - cameraPerson.y,
		)
	}

	drawUpperImage(ctx: CanvasRenderingContext2D, cameraPerson: GameObject): void {
		ctx.drawImage(
			this.upperImage,
			utils.withGrid(utils.xCameraNudge) - cameraPerson.x,
			utils.withGrid(utils.yCameraNudge) - cameraPerson.y,
		)
	}

	isSpaceTaken(currentX: number, currentY: number, direction: MovementDirection): boolean {
		const { x, y } = utils.nextPosition(currentX, currentY, direction)

		return this.walls[`${x},${y}`] || false
	}

	mountObjects() {
		Object.keys(this.gameObjects).forEach((key) => {
			const object = this.gameObjects[key]
			object.id = key

			//TODO: determine if this object should actually mount
			object.mount(this)
		})
	}

	addWall(x: number, y: number): void {
		this.walls[`${x},${y}`] = true
	}

	removeWall(x: number, y: number): void {
		delete this.walls[`${x},${y}`]
	}

	moveWall(wasX: number, wasY: number, direction: MovementDirection): void {
		this.removeWall(wasX, wasY)

		const { x, y } = utils.nextPosition(wasX, wasY, direction)
		this.addWall(x, y)
	}
}

export default OverworldMap
