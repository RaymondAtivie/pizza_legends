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
}

export default OverworldMap
