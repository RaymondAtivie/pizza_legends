import Sprite from '../Sprite'
import Assets from '../utils/Assets'
import OverworldMap from '../OverworldMap'

export enum MovementDirection {
	Up = 'Up',
	Down = 'Down',
	Left = 'Left',
	Right = 'Right',
}

export type GameObjectConfig = {
	x?: number
	y?: number
	src: string
	direction?: MovementDirection
	useShadow?: boolean
	behaviourLoop?: BehaviorEvent[]
}

export type BehaviorEvent = {
	type: 'walk' | 'stand'
	direction: MovementDirection
	time?: number
}

class GameObject {
	id: string | number | null
	x: number
	y: number
	sprite: Sprite
	direction: MovementDirection
	isMounted: boolean
	behaviourLoop?: BehaviorEvent[]

	constructor(config: GameObjectConfig) {
		this.id = null
		this.isMounted = false
		this.x = config.x || 0
		this.y = config.y || 0
		this.direction = config.direction || MovementDirection.Down
		this.sprite = new Sprite({
			gameObject: this,
			src: config.src || Assets.characters.hero,
			useShadow: config.useShadow === undefined ? true : config.useShadow,
		})
	}

	mount(map: OverworldMap) {
		console.log('Mounting - ' + this.sprite.image.src)
		this.isMounted = true

		map.addWall(this.x, this.y)
	}

	update(state: any) {}
}

export default GameObject
