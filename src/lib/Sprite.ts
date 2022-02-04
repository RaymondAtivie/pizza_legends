import GameObject from './objects/GameObject'
import Assets from './utils/Assets'

export enum animationType {
	idleDown = 'idleDown',
	walkDown = 'walkDown',
}

export type SpriteConfigAnimation = { [K in animationType]?: number[][] }

export type SpriteConfig = {
	animations?: SpriteConfigAnimation
	currentAnimation?: animationType
	src: string
	gameObject: GameObject
	useShadow?: boolean
}

class Sprite {
	animations: SpriteConfigAnimation
	currentAnimation: animationType
	currentAnimationFrame: number

	gameObject: GameObject

	image: HTMLImageElement
	isLoaded: boolean = false

	shadow?: HTMLImageElement
	isShadowLoaded: boolean = false
	useShadow: boolean

	constructor(config: SpriteConfig) {
		// Set up the image
		this.image = new Image()
		this.image.src = config.src
		this.image.onload = () => {
			this.isLoaded = true
		}

		// Shadow
		this.useShadow = config.useShadow || true
		this.shadow = new Image()
		if (this.useShadow) {
			this.shadow.src = Assets.characters.shadow
		}
		this.shadow.onload = () => {
			this.isShadowLoaded = true
		}

		// Set up the configuration
		this.animations = config.animations || {
			[animationType.idleDown]: [[0, 0]],
		}
		this.currentAnimation = config.currentAnimation || animationType.idleDown
		this.currentAnimationFrame = 0

		// Reference the game object (creator of this sprite)
		this.gameObject = config.gameObject
	}

	draw(ctx: CanvasRenderingContext2D) {
		const x = this.gameObject.x - 8
		const y = this.gameObject.y - 18

		this.isShadowLoaded && this.shadow && ctx.drawImage(this.shadow, x, y)
		this.isLoaded && ctx.drawImage(this.image, 0, 0, 32, 32, x, y, 32, 32)
	}
}

export default Sprite
