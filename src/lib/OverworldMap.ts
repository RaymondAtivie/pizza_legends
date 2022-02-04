import GameObject from './objects/GameObject'
import utils from './utils/utils'

type OverworldMapConfig = {
	gameObjects: Record<string, GameObject>
	lowerSrc: string
	upperSrc: string
}

class OverworldMap {
	gameObjects: Record<string, GameObject>
	lowerImage: HTMLImageElement
	upperImage: HTMLImageElement

	constructor(config: OverworldMapConfig) {
		this.gameObjects = config.gameObjects || {}

		this.lowerImage = new Image()
		this.lowerImage.src = config.lowerSrc

		this.upperImage = new Image()
		this.upperImage.src = config.upperSrc || ''
	}

	drawLowerImage(ctx: CanvasRenderingContext2D, cameraPerson: GameObject) {
		ctx.drawImage(
			this.lowerImage,
			utils.withGrid(utils.xCameraNudge) - cameraPerson.x,
			utils.withGrid(utils.yCameraNudge) - cameraPerson.y,
		)
	}

	drawUpperImage(ctx: CanvasRenderingContext2D, cameraPerson: GameObject) {
		ctx.drawImage(
			this.upperImage,
			utils.withGrid(utils.xCameraNudge) - cameraPerson.x,
			utils.withGrid(utils.yCameraNudge) - cameraPerson.y,
		)
	}
}

export default OverworldMap
