import Sprite from '../Sprite'
import Assets from '../utils/Assets'

export enum MovementDirection {
	UP = 'Up',
	DOWN = 'Down',
	LEFT = 'Left',
	RIGHT = 'Right',
}

export type GameObjectConfig = {
	x?: number
	y?: number
	src: string
	direction?: MovementDirection
}

class GameObject {
	x: number
	y: number
	sprite: Sprite
	direction: MovementDirection

	constructor(config: GameObjectConfig) {
		this.x = config.x || 0
		this.y = config.y || 0
		this.direction = config.direction || MovementDirection.DOWN
		this.sprite = new Sprite({
			gameObject: this,
			src: config.src || Assets.characters.hero,
		})
	}

	update(state: any) {}
}

export default GameObject
