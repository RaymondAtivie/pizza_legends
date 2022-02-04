import GameObject from './objects/GameObject'

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

	drawLowerImage(ctx: CanvasRenderingContext2D) {
		ctx.drawImage(this.lowerImage, 0, 0)
	}

	drawUpperImage(ctx: CanvasRenderingContext2D) {
		ctx.drawImage(this.upperImage, 0, 0)
	}
}

export default OverworldMap
