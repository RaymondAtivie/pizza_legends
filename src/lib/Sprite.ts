import GameObject, { MovementDirection } from './objects/GameObject'
import Assets from './utils/Assets'
import utils from './utils/utils'

export enum animationType {
	idleDown = 'idleDown',
	walkDown = 'walkDown',
	idleUp = 'idleUp',
	walkUp = 'walkUp',
	idleLeft = 'idleLeft',
	walkLeft = 'walkLeft',
	idleRight = 'idleRight',
	walkRight = 'walkRight',
}

export type SpriteConfigAnimation = { [K in animationType]?: number[][] }

export type SpriteConfig = {
	animations?: SpriteConfigAnimation
	currentAnimation?: animationType
	src: string
	gameObject: GameObject
	useShadow?: boolean
	animationFrameLimit?: number
}

class Sprite {
	animations: SpriteConfigAnimation
	currentAnimation: animationType
	currentAnimationFrame: number
	animationFrameLimit: number
	animationFrameProgress: number

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
			[animationType.idleRight]: [[0, 1]],
			[animationType.idleUp]: [[0, 2]],
			[animationType.idleLeft]: [[0, 3]],
			[animationType.walkDown]: [
				[1, 0],
				[0, 0],
				[3, 0],
				[0, 0],
			],
			[animationType.walkRight]: [
				[1, 1],
				[0, 1],
				[3, 1],
				[0, 1],
			],
			[animationType.walkUp]: [
				[1, 2],
				[0, 2],
				[3, 2],
				[0, 2],
			],
			[animationType.walkLeft]: [
				[1, 3],
				[0, 3],
				[3, 3],
				[0, 3],
			],
		}

		// Describes the state and patern of the animation
		this.currentAnimation = config.currentAnimation || animationType.idleDown
		this.currentAnimationFrame = 0

		this.animationFrameLimit = config.animationFrameLimit || utils.defaultFrameLimit
		this.animationFrameProgress = this.animationFrameLimit

		// Reference the game object (creator of this sprite)
		this.gameObject = config.gameObject
	}

	get frame() {
		return this.animations[this.currentAnimation]![this.currentAnimationFrame]
	}

	setAnimation(key: animationType) {
		if (this.currentAnimation !== key) {
			this.currentAnimation = key
			this.currentAnimationFrame = 0
			this.animationFrameProgress = this.animationFrameLimit
		}
	}

	updateAnimationProgress() {
		// Downtic frame progress
		if (this.animationFrameProgress > 0) {
			this.animationFrameProgress--
			return
		}

		// Reset counter and chamge to the next sprite frame
		this.animationFrameProgress = this.animationFrameLimit
		this.currentAnimationFrame += 1

		if (this.frame === undefined) {
			this.currentAnimationFrame = 0
		}
	}

	draw(ctx: CanvasRenderingContext2D) {
		const x = this.gameObject.x - 8
		const y = this.gameObject.y - 18

		this.isShadowLoaded && this.shadow && ctx.drawImage(this.shadow, x, y)

		const [frameX, frameY] = this.frame

		this.isLoaded && ctx.drawImage(this.image, frameX * 32, frameY * 32, 32, 32, x, y, 32, 32)

		this.updateAnimationProgress()
	}
}

export default Sprite
